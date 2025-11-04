import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./db/db.js";
import authRoutes from "./routes/auth.router.js";
import incidentRoutes from "./routes/incidents.router.js";
import sosRoutes from "./routes/sos.router.js";
import newsRoutes from "./routes/news.routes.js";
import chatbotRoute from "./routes/chatbot.router.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(cors({ origin: "https://tripguard.vercel.app/", credentials: true }));

app.use(express.json());
connectDB();
app.use("/api/news", newsRoutes);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/auth", authRoutes);
app.use("/api/incidents", incidentRoutes);
app.use("/api/sos", sosRoutes);
app.get("/", (req, res) => res.send("🚀 Safety backend is up"));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
