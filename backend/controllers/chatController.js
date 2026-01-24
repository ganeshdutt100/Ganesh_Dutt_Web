const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");

dotenv.config();

// API Key Check
if (!process.env.GEMINI_API_KEY) {
  console.error("❌ API Key Missing!");
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("📩 Request:", message);

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }

    // --- 1. DEFINE YOUR PERSONA (SYSTEM PROMPT) ---
    // Yahan hum AI ko batayenge ki wo kiska assistant hai aur tumhari skills kya hain.
    const systemPrompt = `
      You are an advanced AI Assistant for **Ganesh Dutt**. 
      
      **About Ganesh Dutt:**
      - He is a professional **Full Stack Web Developer** and **Trainer**.
      - He specializes in modern web technologies and building scalable applications.
      
      **Ganesh's Tech Stack (Skills):**
      - **Frontend:** HTML, CSS, JavaScript, Bootstrap, Tailwind CSS, React.js, Next.js.
      - **Backend:** Node.js, Express.js.
      - **Full Stack:** MERN Stack expert.
      
      **Your Instructions:**
      1. Always answer as Ganesh's assistant. Be polite, professional, and helpful.
      2. If a user asks technical questions (code), provide solutions using Ganesh's preferred stack (e.g., prefer Tailwind over plain CSS, React over vanilla JS).
      3. If asked "Who is Ganesh?", summarize his profile and skills mentioned above.
      4. Keep answers concise but informative.

      **User's Question:** ${message}
    `;

    // --- 2. SELECT MODEL ---
    // Wahi model jo chal raha tha (Lite version)
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-lite-latest",
    });

    // --- 3. GENERATE CONTENT ---
    // Hum 'message' ki jagah 'systemPrompt' bhejenge jisme message included hai
    const result = await model.generateContent(systemPrompt);
    const response = await result.response;
    const text = response.text();

    console.log("✅ Success! Reply Sent.");
    res.status(200).json({ success: true, reply: text });
  } catch (error) {
    console.error("🔥 Error:", error.message);

    res.status(500).json({
      success: false,
      message: "API Issue. Please try again.",
      error: error.message,
    });
  }
};

module.exports = { chatWithAI };
