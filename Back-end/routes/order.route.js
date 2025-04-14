// Importing required modules and dependencies
const express = require("express");
const router = express.Router();
const { 
  placeOrder, 
  getAllOrders, 
  updateOrderStatus, 
  cancelOrder, 
  getCustomerOrders 
} = require("../controllers/order.controller"); // Importing order-related controller functions

const { authenticateCustomer, authenticateSupplier } = require("../middlewares/auth.middleware.js"); // Middleware for authentication

// ✅ Route for placing an order (Protected - Only customers can place orders)
router.post("/", authenticateCustomer, placeOrder);

// ✅ Route to view all orders (Protected - Only suppliers can view all orders)
router.get("/", authenticateSupplier, getAllOrders);

// ✅ Route to update order status (Protected - Only suppliers can update order status)
router.put("/:orderId/status", authenticateSupplier, updateOrderStatus);

// ✅ Route to cancel an order (Protected - Only customers can cancel their own orders)
router.delete("/:orderId", authenticateCustomer, cancelOrder);

// ✅ Route to fetch orders for a specific customer (Protected - Only logged-in customers can access their own orders)
router.get("/customer", authenticateCustomer, getCustomerOrders);

module.exports = router; // Exporting the router for use in the main application
