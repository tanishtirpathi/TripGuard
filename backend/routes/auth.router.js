// routes/auth.js
import express from "express";
import auth from "../middleware/auth.js"
import { signup, login, logout, dashboard } from "../controllers/user.controller.js";

const router = express.Router();

// Auth routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", auth, logout);
router.get("/dashboard", auth, dashboard);

export default router;
