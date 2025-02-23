const express = require("express");
const router = express.Router();
const { loginSupplier, registerSupplier } = require("../controllers/supplier.controller.js");

// Supplier registration route
router.post("/register", registerSupplier);
// Supplier login route
router.post("/login", loginSupplier);

module.exports = router;
