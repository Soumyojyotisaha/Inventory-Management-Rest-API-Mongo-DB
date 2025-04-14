const Customer = require("../models/customer.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // ✅ Use bcryptjs instead of bcrypt
const crypto = require("node:crypto");
const {sendEmail} = require("../utils/mailer");
const { sendOTP, generateOTP } = require("../utils/mailer"); 
const { otpStorage } = require("../utils/otpStorage");

const tokenBlacklist = new Set(); // Store blacklisted tokens temporarily
const JWT_SECRET = "your_static_secret_key";

// ✅ Enable or Disable 2FA
const toggle2FA = async (req, res) => {
  try {
    const { email, enable } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    customer.twoFactorEnabled = enable;
    await customer.save();

    res.json({ message: `2FA ${enable ? "enabled" : "disabled"} successfully!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Customer
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the customer already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res.status(400).json({ message: "Customer already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new customer
    const newCustomer = new Customer({ name, email, password: hashedPassword });
    await newCustomer.save();

    res.status(201).json({ message: "Customer registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });

    if (!customer || !(await bcrypt.compare(password, customer.password))) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (customer.twoFactorEnabled) {
      // ✅ Generate and send OTP
      const otp = generateOTP();
      customer.otp = otp;
      customer.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
      await customer.save();

      await sendOTP(customer.email, customer.name, otp);

      return res.status(200).json({ message: "OTP sent to your email", twoFactorRequired: true });
    }

    // ✅ Generate JWT token if 2FA is disabled
    const token = jwt.sign({ id: customer._id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Login successful",
      token,
      customer: { id: customer._id, name: customer.name, email: customer.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const storedOTP = otpStorage[email.toLowerCase()]; // Ensure case consistency

    console.log(`🔍 Checking OTP for email: ${email.toLowerCase()}`);
    console.log(`🔍 OTP Storage:`, otpStorage); // Print full OTP storage for debugging

    if (!storedOTP) {
      console.log("❌ OTP not found in storage");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    console.log(`✅ Stored OTP: ${storedOTP.otp}`);
    console.log(`✅ OTP Expiry Time: ${storedOTP.expires} | Current Time: ${Date.now()}`);

    // Check OTP validity
    if (storedOTP.otp !== otp || Date.now() > storedOTP.expires) {
      console.log("❌ OTP is incorrect or expired");
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    console.log("✅ OTP verified successfully!");

    // Remove OTP after successful verification
    delete otpStorage[email.toLowerCase()];

    return res.json({ message: "OTP verified. Login successful" });
  } catch (error) {
    console.error("⚠️ Error in OTP verification:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


// Get Customer Profile
const getCustomerProfile = async (req, res) => {
  try {
    const customer = await Customer.findById(req.customer.id).select("-password"); // Exclude password
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Customer Profile
const updateCustomerProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const customer = await Customer.findById(req.customer.id);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Update fields
    if (name) customer.name = name;
    if (email) customer.email = email;

    await customer.save();

    res.status(200).json({
      message: "Profile updated successfully",
      customer: {
        id: customer._id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({}, "-password"); // Exclude passwords
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Customer Profile
const deleteCustomerProfile = async (req, res) => {
  try {
    const customerId = req.customer.id;

    // Find and delete customer
    const deletedCustomer = await Customer.findByIdAndDelete(customerId);
    if (!deletedCustomer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout Customer (Invalidate Token)
const logoutCustomer = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract token

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    tokenBlacklist.add(token); // Add token to blacklist
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forget Password
const forgotPassword = async (req, res) => {
  try {
    const customerId = req.customer.id; // Get customer ID from authenticated token
    const customer = await Customer.findById(customerId); // Fetch full document

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    customer.resetPasswordToken = resetToken;
    customer.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    await customer.save(); // Save updated fields

    // Send Reset Email
    const emailBody = `Use this token to reset your password: ${resetToken}`;
    const emailSent = await sendEmail(customer.email, "Password Reset Request", emailBody);

    if (emailSent) {
      res.json({ message: "Password reset token sent to your email." });
    } else {
      res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword, token } = req.body;
    const customerId = req.customer.id;

    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    if (customer.resetPasswordToken !== token || customer.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // ✅ Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    customer.password = await bcrypt.hash(newPassword, salt);

    customer.resetPasswordToken = undefined;
    customer.resetPasswordExpires = undefined;

    await customer.save();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = { 
  registerCustomer, 
  loginCustomer, 
  getCustomerProfile, 
  updateCustomerProfile, 
  getAllCustomers,  
  deleteCustomerProfile,
  logoutCustomer,
  forgotPassword,
  resetPassword,
  toggle2FA,
  verifyOTP,  
  sendOTP,
  tokenBlacklist  
};