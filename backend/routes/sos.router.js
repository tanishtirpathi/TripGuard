// routes/sos.router.js
import express from "express";
import auth from "../middleware/auth.js"
import { handleSOS } from "../controllers/sos.controller.js";

const router = express.Router();

// POST /api/sos
router.post("/", auth, handleSOS);

export default router;
