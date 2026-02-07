import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGeminiApiData = async (cat) => {
  // Model 1.5-flash fast aur JSON ke liye best hai
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" } // Force JSON response
  });

 const prompt = `
  You are an Anime Food Artist. The user has a ${cat.breed} named ${cat.name}.
  
  Task:
  1. Create a creative anime-style food dish name.
  2. Write a detailed visual prompt for an image generator.
  
  Format the visual prompt exactly like this: 
  "Studio Ghibli style, high-quality anime art, a cute bowl of [DISH NAME] for a ${cat.breed} cat, sparkling details, aesthetic lighting, vibrant colors, 4k"

  Return ONLY JSON:
  {
    "food_name": "...",
    "visual_prompt": "..."
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