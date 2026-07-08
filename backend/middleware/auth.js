const jwt = require("jsonwebtoken");

// Protects admin-only routes. Expects header:
//   Authorization: Bearer <token>
// Blocks with 401 if missing/invalid/expired, otherwise lets the request
// continue and attaches the decoded payload to req.admin.
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = requireAdmin;
