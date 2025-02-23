const express = require("express");
const { 
  registerCustomer, 
  loginCustomer, 
  getCustomerProfile, 
  updateCustomerProfile, 
  getAllCustomers 
} = require("../controllers/customer.controller.js");

const { authenticateCustomer, authenticateSupplier } = require("../middlewares/auth.middleware.js"); // Correct import

const router = express.Router();

// Only suppliers can view all customers
router.get("/", authenticateSupplier, getAllCustomers);

// Route for customer registration
router.post("/register", registerCustomer);

// Route for customer login
router.post("/login", loginCustomer);

// Customer profile routes (only logged-in customers can access their own profile)
router.get("/profile", authenticateCustomer, getCustomerProfile);
router.put("/profile", authenticateCustomer, updateCustomerProfile);

module.exports = router;
