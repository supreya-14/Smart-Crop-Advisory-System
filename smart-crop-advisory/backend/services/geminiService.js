const axios = require("axios");

// Local Ollama API
const OLLAMA_URL = "http://localhost:11434/api/generate";

// Helper function to ask Ollama
const askGemini = async (prompt) => {
  try {
    const response = await axios.post(OLLAMA_URL, {
      model: "gemma3:4b",
      prompt: prompt,
      stream: false,
    });

    return (
      response.data.response ||
      "Sorry, I could not generate a response right now."
    );
  } catch (error) {
    console.error("Ollama Error:", error.response?.data || error.message);
    throw new Error("Failed to get response from AI service");
  }
};

// Crop Recommendation
const getCropRecommendation = async ({
  soilType,
  city,
  state,
  season,
  landSize,
}) => {
  const prompt = `
You are an expert agricultural advisor helping a farmer in India.

Farm Details:
- Soil Type: ${soilType}
- City: ${city}
- State: ${state}
- Season: ${season}
- Land Size: ${landSize}

Provide:
1. Top 3 suitable crops with reasons.
2. Fertilizer recommendation.
3. Irrigation tips.

Keep the answer simple and use bullet points.
`;

  return await askGemini(prompt);
};

// Weather Advisory
const getWeatherAdvisory = async ({ cropName, weatherSummary }) => {
  const prompt = `
You are an agriculture expert.

Crop: ${cropName}

Weather:
${weatherSummary}

Give:
1. Irrigation advice.
2. Pest/Disease warning.
3. Fertilizer timing.

Keep the answer short and practical.
`;

  return await askGemini(prompt);
};

// Disease Guidance
const getDiseaseGuidance = async ({ cropName, symptoms }) => {
  const prompt = `
Crop: ${cropName}

Symptoms:
${symptoms}

Provide:
1. Possible disease.
2. Confirmation steps.
3. Treatment.
4. Prevention.

Mention this is only general guidance.
`;

  return await askGemini(prompt);
};

// Chatbot
const getChatbotReply = async (question) => {
  const prompt = `
You are AgriBot.

Answer the following farmer question in simple language.

Question:
${question}
`;

  return await askGemini(prompt);
};

module.exports = {
  getCropRecommendation,
  getWeatherAdvisory,
  getDiseaseGuidance,
  getChatbotReply,
};
