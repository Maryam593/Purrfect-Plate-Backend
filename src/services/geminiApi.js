import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiApiData = async (cat) => {
  // Model 1.5-flash fast aur JSON ke liye best hai
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { responseMimeType: "application/json" } // Force JSON response
  });

  const prompt = `
    You are a whimsical Anime-style Cat Chef and Vet. 
    User has a cat named "${cat.name}" which is a "${cat.breed}".

    Task:
    1. Recommend ONE creative, delicious, anime-style meal for this specific cat (e.g., "Sparkling Tuna Sashimi with Silvervine Garnish").
    2. Give a very short 1-line health tip related to this breed and weather.
    3. Keep the tone cute, like a Ghibli movie character.

    Return ONLY a JSON object with this exact structure:
    {
      "food_name": "Name of the anime dish",
      "health_tip": "Short 1-line advice",
      "anime_visual_description": "A prompt to describe this food in anime style"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text()); // JSON return karega
  } catch (error) {
    console.error("Gemini Error:", error);
    return { 
      food_name: "Magic Cat Treats", 
      health_tip: "Keep your kitty hydrated!",
      anime_visual_description: "Cute cat food bowl" 
    };
  }
};

export default getGeminiApiData;