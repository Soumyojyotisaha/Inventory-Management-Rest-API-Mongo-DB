const jwt = require("jsonwebtoken");

const JWT_SECRET = "your_static_secret_key"; // Keep it consistent

const authenticateCustomer = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.customer = decoded; // Attach the decoded customer data
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

const authenticateSupplier = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied, no token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.supplier = decoded; // Attach the decoded supplier data
    next();
  } catch (error) {
    return res.status(400).json({ message: "Invalid token" });
  }
};

module.exports = { authenticateCustomer, authenticateSupplier };
