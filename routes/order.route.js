const express = require("express");
const router = express.Router();
const { placeOrder, getAllOrders, updateOrderStatus, cancelOrder, getCustomerOrders } = require("../controllers/order.controller");
const { authenticateCustomer, authenticateSupplier } = require("../middlewares/auth.middleware.js"); // Correct imports

// Place Order (Customer only)
router.post("/", authenticateCustomer, placeOrder);

// View All Orders (Supplier only)
router.get("/", authenticateSupplier, getAllOrders);

// Update Order Status (Supplier only)
router.put("/:orderId/status", authenticateSupplier, updateOrderStatus);

// Cancel Order (Customer only)
router.delete("/:orderId", authenticateCustomer, cancelOrder);

// ✅ Get a particular customer's orders (Only for logged-in customers)
router.get("/customer", authenticateCustomer, getCustomerOrders);


module.exports = router;
