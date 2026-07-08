// This middleware checks if a request has a valid JWT token.
// If valid, it attaches the user's info to req.user and lets the request continue.
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Token is expected in the header as: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Not authorized, no token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token using our secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (id and role) to the request object
    req.user = decoded;

    next(); // move on to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token" });
  }
};

// This middleware checks if the logged-in user is an admin.
// Must be used AFTER the protect middleware.
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = { protect, adminOnly };
