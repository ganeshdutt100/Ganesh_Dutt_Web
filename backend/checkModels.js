const dotenv = require("dotenv");

// .env file load karo
dotenv.config();

const API_KEY = process.env.GEMINI_API_KEY;

async function checkAvailableModels() {
  if (!API_KEY) {
    console.log("❌ Error: .env file mein GEMINI_API_KEY nahi mili!");
    return;
  }

  console.log("🔍 Google se models ki list manga raha hu...");

  try {
    // Direct API Call (SDK bypass karke)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`,
    );
    const data = await response.json();

    if (data.error) {
      console.error("❌ Google Error:", data.error.message);
      return;
    }

    console.log("\n✅ TUMHARE ACCOUNT PAR YE MODELS AVAILABLE HAIN:");
    console.log("------------------------------------------------");

    const freeModels = data.models.filter((m) =>
      m.supportedGenerationMethods.includes("generateContent"),
    );

    freeModels.forEach((model) => {
      // Sirf naam print karega (ex: models/gemini-1.5-flash)
      console.log(`👉 ${model.name.replace("models/", "")}`);
    });

    console.log("------------------------------------------------");
    console.log(
      "💡 Upar wali list mein se koi bhi ek naam utha kar Controller mein daal do!",
    );
  } catch (error) {
    console.error("❌ Network Error:", error.message);
  }
}

checkAvailableModels();
