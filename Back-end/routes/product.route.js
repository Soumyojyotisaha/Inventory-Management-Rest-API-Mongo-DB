// Importing required modules
const express = require("express");
const router = express.Router();
const { authenticateSupplier } = require("../middlewares/auth.middleware.js"); 
const {
  getProducts,         // Function to get all products
  getProduct,          // Function to get a single product by ID
  createProduct,       // Function to create a new product
  updateProduct,       // Function to update product details
  deleteProduct,       // Function to delete a product
  searchProducts,      // Function to search for products
  bulkInsertProducts,  // Function to insert multiple products at once
  addStock,            // Function to add stock to an existing product
} = require("../controllers/product.controller.js"); // Importing product-related controller functions

// ✅ Route to search for products (Placed first to prevent conflicts with other routes)
router.get("/search", searchProducts);

// ✅ Routes for product CRUD operations
router.get("/", getProducts);        // Fetch all products
router.get("/:id", getProduct);       // Fetch a specific product by its ID
router.post("/",authenticateSupplier, createProduct);      // Create a new product
router.put("/:id",authenticateSupplier, updateProduct);    // Update an existing product by ID
router.delete("/:id",authenticateSupplier, deleteProduct); // Delete a product by ID

// ✅ Additional routes for bulk operations and stock management
router.post("/bulk",authenticateSupplier, bulkInsertProducts);     // Bulk insert multiple products
router.patch("/:id/add-stock",authenticateSupplier, addStock);     // Add stock to an existing product

module.exports = router; // Exporting the router for use in the main application
