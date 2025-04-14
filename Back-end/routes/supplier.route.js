// Importing required modules
const express = require("express");
const router = express.Router();

const { 
  loginSupplier,           // Function to handle supplier login
  registerSupplier,        // Function to handle supplier registration
  logoutSupplier,          // Function to handle supplier logout
  forgotPasswordSupplier,  // Function to handle forgot password functionality
  resetPasswordSupplier    // Function to handle password reset functionality
} = require("../controllers/supplier.controller.js"); // Importing supplier-related controller functions

const { authenticateSupplier } = require("../middlewares/auth.middleware.js"); // Middleware to authenticate supplier

// ✅ Route for supplier registration
router.post("/register", registerSupplier);

// ✅ Route for supplier login
router.post("/login", loginSupplier);

// ✅ Route for supplier logout (Requires authentication)
router.post("/logout", authenticateSupplier, logoutSupplier);

// ✅ Route to initiate password reset (Sends reset link via email)
router.post("/forgot-password", forgotPasswordSupplier);

// ✅ Route to reset password using the reset token
router.post("/reset-password", resetPasswordSupplier);

module.exports = router; // Exporting the router for use in the main application
