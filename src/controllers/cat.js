import getCatFromApi from "../services/catApi.js";
import getGeminiApiData from "../services/geminiApi.js";

const catController = {
  catData: async (req, res) => {
    try {
      const { name, breed } = req.body;

      // Validate input
      if (!name && !breed) {
        return res.status(400).json({ message: "Please enter cat name and breed" });
      }

      // Fetch basic cat info from your API
      const catData = breed ? await getCatFromApi(breed) : await getCatFromApi(name);
      if (!catData) return res.status(404).json({ message: "Cat data not found" });

      // Prepare Gemini input
      const geminiInput = {
        ...catData,
        name: name || "Little Friend"
      };

      // Get AI response (food_name + visual_prompt)
      const geminiResult = await getGeminiApiData(geminiInput);

      // Generate Anime Image using Pollinations API
      const animePrompt = encodeURIComponent(geminiResult.visual_prompt);
      const generatedImageURL = `https://image.pollinations.ai/prompt/${animePrompt}?width=512&height=512&nologo=true&model=flux&seed=${Math.floor(Math.random() * 10000)}`;

      // Return structured data for frontend
      res.status(200).json({
        cat: {
          name: name || "Unknown",
          breed: catData.breed || breed,
          food: geminiResult.food_name || "Special Magic Meal",
          image: generatedImageURL,  // AI-generated anime food image
          health_tip: geminiResult.health_tip || "Keep your kitty hydrated!"
        }
      });

    } catch (error) {
      console.error("Controller Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default catController;
