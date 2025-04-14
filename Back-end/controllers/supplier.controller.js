// Import required modules
const Supplier = require("../models/supplier.model.js"); // Supplier model for database operations
const jwt = require("jsonwebtoken"); // JWT library for authentication
const bcrypt = require("bcryptjs"); // ✅ Use bcryptjs instead of bcrypt // Library for hashing passwords
const tokenBlacklist = new Set(); // In-memory set to store blacklisted tokens (for logout)
const crypto = require("node:crypto");
const {sendEmail} = require("../utils/mailer.js"); // Utility function to send emails

// ✅ Supplier Login Handler
const loginSupplier = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if supplier exists in the database
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for authentication
    const JWT_SECRET = "your_static_secret_key"; // Secret key used for signing JWTs
    const token = jwt.sign({ id: supplier._id }, JWT_SECRET, {
      expiresIn: "1d", // Token expires in 1 day
    });

    // Return success response with token and supplier details
    res.status(200).json({
      message: "Login successful",
      token,
      supplier: { id: supplier._id, name: supplier.name, email: supplier.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// ✅ Supplier Registration Handler
const registerSupplier = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if supplier already exists to prevent duplicate registrations
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists with this email." });
    }

    // Hash the password before storing in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save a new supplier record
    const newSupplier = await Supplier.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token for authentication
    const JWT_SECRET = "your_static_secret_key"; // Keep it consistent
    const token = jwt.sign({ id: newSupplier._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    // Return success response with token and supplier details
    res.status(201).json({
      message: "Supplier registered successfully",
      token,
      supplier: { id: newSupplier._id, name: newSupplier.name, email: newSupplier.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// ✅ Supplier Logout Handler
const logoutSupplier = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from headers

    // If no token is provided, return an error
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    tokenBlacklist.add(token); // Add token to blacklist to prevent reuse
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle server errors
  }
};

// ✅ Forgot Password Handler
const forgotPasswordSupplier = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = email.toLowerCase(); // Normalize email for case insensitivity
    const supplier = await Supplier.findOne({ email: normalizedEmail });

    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Generate Reset Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    supplier.resetPasswordToken = resetToken;
    supplier.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration

    await supplier.save(); // Save updated fields

    // Send Reset Email
    const emailBody = `Use this token to reset your password: ${resetToken}`;
    const emailSent = await sendEmail(supplier.email, "Password Reset Request", emailBody);

    if (emailSent) {
      res.json({ message: "Password reset token sent to your email." });
    } else {
      res.status(500).json({ message: "Error sending email" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPasswordSupplier = async (req, res) => {
  try {
    const { newPassword, token } = req.body;

    const supplier = await Supplier.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure token is still valid
    });

    if (!supplier) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Hash the new password before saving
    const salt = await bcrypt.genSalt(10);
    supplier.password = await bcrypt.hash(newPassword, salt);

    supplier.resetPasswordToken = undefined;
    supplier.resetPasswordExpires = undefined;

    await supplier.save();

    res.json({ message: "Password reset successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Export all supplier authentication handlers
module.exports = { 
  loginSupplier, 
  registerSupplier, 
  logoutSupplier, 
  forgotPasswordSupplier, 
  resetPasswordSupplier 
};