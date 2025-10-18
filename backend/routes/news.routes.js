import express from "express";
import { getNewsByLocation } from "../controllers/news.controller.js"; 
const router = express.Router();
router.get("/", getNewsByLocation);
export default router;