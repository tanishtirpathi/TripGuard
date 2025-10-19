import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"; // Load .env variables for API key

// Initialize Gemini client using the environment variable GEMINI_API_KEY
// Note: Ensure GEMINI_API_KEY is set in your .env file
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    console.error("GEMINI_API_KEY is not set in environment variables.");
    // Exit or throw error if key is missing in a real application
}
const genAI = new GoogleGenerativeAI(apiKey);

// Chatbot controller function for Express route
export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || typeof message !== "string") {
            // Added check for empty string as well, though typeof string handles null/undefined
            return res.status(400).json({ error: "Message must be a non-empty string." });
        }

        // --- Model Update ---
        // Using the latest 2.5 Flash model name.
        // If you were using a specific preview version, you could use "gemini-2.5-flash-preview-09-2025"
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        // Generate content
        const result = await model.generateContent(message);
        
        // Extract reply safely and clean up any potential extra whitespace
        const reply = result.response.text?.trim() 
                      || "Sorry, I couldn’t generate a reply.";

        res.json({ reply });

    } catch (error) {
        // Log the full error object for better debugging on the server
        console.error("Gemini API Error:", error); 
        res.status(500).json({ error: "Gemini API request failed.", details: error.message });
    }
};
