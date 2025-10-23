import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    // ✅ Debug: check cookies
    console.log("Cookies received:", req.cookies);

    // 🔹 Access token only from cookies
    const token = req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token found in cookies, authorization denied" });
    }

    // 🔹 Verify token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // 🔹 Attach user info to req
    req.user = decoded;

    next(); // ✅ Continue to next middleware/controller
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
