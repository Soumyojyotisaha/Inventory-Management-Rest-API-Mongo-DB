// Importing required modules
const jwt = require("jsonwebtoken"); // Library to handle JWT authentication
const JWT_SECRET = "your_static_secret_key"; // Secret key for signing JWT tokens
const { tokenBlacklist } = require("../controllers/customer.controller.js"); // Importing token blacklist to manage logged-out tokens

// ✅ Middleware to authenticate customers
const authenticateCustomer = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract the token from the Authorization header

  // If no token is provided, return an unauthorized response
  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }

  // Check if the token has been blacklisted (logged out)
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token is blacklisted. Please log in again." });
  }

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token,JWT_SECRET);
    req.customer = decoded; // Attach the decoded customer information to the request
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: "Invalid token" }); // Return error for invalid tokens
  }
};

// ✅ Middleware to authenticate suppliers
const authenticateSupplier = (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the Authorization header

  // If no authorization header is present or it doesn't start with "Bearer ", return an error
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token

  // Check if the token is blacklisted (logged out)
  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: "Token has been logged out" });
  }

  try {
    // Verify the token and extract the payload
    const decoded = jwt.verify(token, JWT_SECRET);
    req.supplier = { id: decoded.id }; // Attach the supplier ID for further processing
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" }); // Return error for invalid tokens
  }
};

// Export the authentication middlewares for use in routes
module.exports = { authenticateCustomer, authenticateSupplier };