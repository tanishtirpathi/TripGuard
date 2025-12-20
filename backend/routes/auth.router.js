import express from "express";
import auth from "../middleware/auth.js";
import {
  signup,
  loginUser,
  logoutUser,
  dashboard,
  // verify,
} from "../controllers/user.controller.js";
import {googleAuthController} from "../controllers/auth.controller.js"
const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
router.post("/google", googleAuthController);
router.get("/dashboard", auth, dashboard);

export default router;
