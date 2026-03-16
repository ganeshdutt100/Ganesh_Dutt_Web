const Groq = require("groq-sdk");

const handleChat = async (req, res) => {
  try {
    // 👇 FIX: Groq client setup ko function ke andar rakh diya
    // Ab ye tabhi chalega jab server puri tarah on ho jayega aur .env load ho chuki hogi
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const { prompt } = req.body; // Frontend se aane wala message

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        // System prompt
        {
          role: "system",
          content:
            "You are a helpful assistant on the portfolio website of Ganesh Dutt, a Full Stack Web Developer & Trainer. Keep your answers short, professional, and friendly.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      // Llama 3 model
      model: "llama-3.1-8b-instant",
    });

    // Groq ka reply nikalna
    const botReply =
      chatCompletion.choices[0]?.message?.content ||
      "Sorry, I couldn't understand that.";

    // Frontend ko response bhejna
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("Groq API Error:", error);
    res.status(500).json({ error: "Something went wrong with the chatbot!" });
  }
};

module.exports = { handleChat };
