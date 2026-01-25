const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config(); // Dotenv load karna zaroori hai

// API Key Check
const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    // 1. Check Key & Message
    if (!genAI) {
      return res.status(500).json({ reply: "Server Error: API Key missing." });
    }
    if (!message) {
      return res.status(400).json({ reply: "Please send a message." });
    }

    // 2. Persona Set Karo
    const systemPrompt = `
      You are an AI Assistant for **Ganesh Dutt**'s Portfolio.
      About Ganesh: MERN Stack Developer, Expert in React & Node.js.
      
      Instructions:
      - Act polite and professional.
      - Keep answers short (under 50 words).
      - If asked "Who made you?", say "I am powered by Gemini AI, integrated by Ganesh."
      
      User Question: ${message}
    `;

    // 3. AI Model Call
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ reply: "My brain is tired. Try again later!" });
  }
};

module.exports = { chatWithAI };
