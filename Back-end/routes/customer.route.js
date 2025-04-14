// Importing required modules and dependencies
const express = require("express");
const { 
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
  sendOTP,
  verifyOTP
} = require("../controllers/customer.controller.js"); // Importing customer-related controller functions

const { authenticateCustomer, authenticateSupplier } = require("../middlewares/auth.middleware.js"); // Middleware for authentication

const router = express.Router(); // Creating an Express router instance

// ✅ Route to get all customers (Accessible only by suppliers)
router.get("/", authenticateSupplier, getAllCustomers);

// ✅ Route for customer registration (Public)
router.post("/register", registerCustomer);

// ✅ Route for customer login (Public)
router.post("/login", loginCustomer);

// ✅ Enable/Disable 2FA
router.post("/toggle-2fa", toggle2FA);

// ✅ Send OTP
router.post("/send-otp", sendOTP); 

// ✅ Verify OTP
router.post("/verify-otp", verifyOTP); 

// ✅ Routes for customer profile management (Protected - Requires Authentication)
// Get customer profile
router.get("/profile", authenticateCustomer, getCustomerProfile);

// Update customer profile
router.put("/profile", authenticateCustomer, updateCustomerProfile);

// Delete customer profile
router.delete("/profile", authenticateCustomer, deleteCustomerProfile);

// ✅ Route for customer logout (Protected - Requires Authentication)
router.post("/logout", authenticateCustomer, logoutCustomer);

// ✅ Password recovery routes (Protected - Requires Authentication)
// Route to initiate password reset (Sends reset email)
router.post("/forgot-password", authenticateCustomer, forgotPassword);

// Route to reset password using a token
router.post("/reset-password", authenticateCustomer, resetPassword);

module.exports = router; // Exporting the router for use in the main application
