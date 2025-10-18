import express from "express";
import auth from "../middleware/auth.js"
import {
  createIncident,
  getAllIncidents,
  getNearbyIncidents,
  updateIncidentStatus,
  deleteIncident,
} from "../controllers/incident.controller.js";
const router = express.Router();
router.post("/", auth, createIncident);
router.get("/", auth, getAllIncidents);
router.get("/nearby", getNearbyIncidents);
router.patch("/:id", auth, updateIncidentStatus);
router.delete("/:id", auth, deleteIncident);
export default router;
