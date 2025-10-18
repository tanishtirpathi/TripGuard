import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });
    
    // Remove 'Bearer ' prefix
    if (token.startsWith("Bearer ")) {
        token = token.slice(7).trim();
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    return next();
  } catch (err) {
    console.error("Auth middleware error:", err.message);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

export default authMiddleware;