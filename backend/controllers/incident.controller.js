// controllers/incident.controller.js
import Incident from "../models/Incident.js";

// ✅ CREATE Incident (POST /api/incidents)
export const createIncident = async (req, res) => {
  try {
    const { type, description, location } = req.body;
    if (!type) return res.status(400).json({ message: "Type is required" });

    const inc = new Incident({
      user: req.user.id, // From auth middleware
      type,
      description,
      location: location || {},
      status: "Pending",
    });

    await inc.save();
    return res.status(201).json(inc);
  } catch (err) {
    console.error("Create incident error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET All Incidents (GET /api/incidents)
export const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.json(incidents);
  } catch (err) {
    console.error("List incidents error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ GET Nearby Incidents (GET /api/incidents/nearby)
export const getNearbyIncidents = async (req, res) => {
  try {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: "lat and lng must be valid numbers" });
    }

    const incidents = await Incident.find();

    const nearby = incidents.filter((incident) => {
      if (!incident.location?.lat || !incident.location?.lng) return false;

      const R = 6371; // Earth radius in km
      const lat1Rad = lat * Math.PI / 180;
      const lat2Rad = incident.location.lat * Math.PI / 180;
      const dLat = (incident.location.lat - lat) * Math.PI / 180;
      const dLng = (incident.location.lng - lng) * Math.PI / 180;

      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(dLng / 2) * Math.sin(dLng / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      return distance <= 10; // within 10 km
    });

    return res.json({ count: nearby.length, incidents: nearby });
  } catch (err) {
    console.error("Nearby incidents error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ UPDATE Incident Status (PATCH /api/incidents/:id)
export const updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const inc = await Incident.findById(req.params.id);

    if (!inc) return res.status(404).json({ message: "Incident not found" });

    if (status) inc.status = status;
    await inc.save();
    return res.json(inc);
  } catch (err) {
    console.error("Update incident error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ DELETE Incident (DELETE /api/incidents/:id)
export const deleteIncident = async (req, res) => {
  try {
    const inc = await Incident.findById(req.params.id);

    if (!inc) return res.status(404).json({ message: "Incident not found" });

    await inc.deleteOne();
    return res.json({ message: "Incident deleted" });
  } catch (err) {
    console.error("Delete incident error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
