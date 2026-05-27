const jwt = require("jsonwebtoken");

const protect = async (req, res, next) => {
  let token;

  // Check token exists
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Not authorized, token failed",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token, authorization denied",
    });
  }
};

module.exports = protect;