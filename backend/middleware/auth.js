import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies);
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(401).json({ message: "No token found in cookies, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
