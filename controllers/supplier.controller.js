const Supplier = require("../models/supplier.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Supplier Login
const loginSupplier = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if supplier exists
    const supplier = await Supplier.findOne({ email });
    if (!supplier) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, supplier.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const JWT_SECRET = "your_static_secret_key"; // Keep it consistent

    const token = jwt.sign({ id: supplier._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      supplier: { id: supplier._id, name: supplier.name, email: supplier.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supplier Registration
const registerSupplier = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if supplier already exists
    const existingSupplier = await Supplier.findOne({ email });
    if (existingSupplier) {
      return res.status(400).json({ message: "Supplier already exists with this email." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new supplier
    const newSupplier = await Supplier.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT token
    const JWT_SECRET = "your_static_secret_key"; // Keep it consistent
    const token = jwt.sign({ id: newSupplier._id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      message: "Supplier registered successfully",
      token,
      supplier: { id: newSupplier._id, name: newSupplier.name, email: newSupplier.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { loginSupplier, registerSupplier };