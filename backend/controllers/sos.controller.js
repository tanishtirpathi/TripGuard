// controllers/sos.controller.js
import Incident from "../models/Incident.js";

// POST /api/sos
export const handleSOS = async (req, res) => {
  try {
    // ✅ Step 1: Ensure req.body exists
    if (!req.body) {
      return res.status(400).json({ message: "Request body is missing" });
    }

    // ✅ Step 2: Destructure safely
    const { message, location } = req.body;

    const inc = new Incident({
      user: req.user.id, // Comes from auth middleware
      type: "sos",
      description: message || "SOS triggered",
      location: location || {},
    });

    await inc.save();

    return res.json({ message: "SOS received and saved", incident: inc });
  } catch (err) {
    console.error("SOS error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
