// controllers/chatController.js
import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"; // Load .env variables

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chatbot controller
export const handleChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message must be a string" });
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate response
    const result = await model.generateContent(message);

    // Extract reply safely
    const reply = result.text || "Sorry, I couldn’t generate a reply.";

    res.json({ reply });
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    res.status(500).json({ error: "Gemini API request failed" });
  }
};
