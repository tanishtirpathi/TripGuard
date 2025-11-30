import express from "express";
import auth from "../middleware/auth.js";
import {
  signup,
  loginUser,
  logoutUser,
  dashboard,
  // verify,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);
// router.get("/verify/:token", verify);
router.get("/dashboard", auth, dashboard);

export default router;
