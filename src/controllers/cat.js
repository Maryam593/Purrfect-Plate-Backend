import getCatFromApi from "../services/catApi.js";
import getGeminiApiData from "../services/geminiApi.js";

const catController = {
  catData: async (req, res) => {
    try {
      const { name, breed, image } = req.body;

      // Check if input is missing
      if (!name && !breed && !image) {
        return res.status(400).json({ message: "Please enter the data to get the desired result" });
      }

      let catData;
      if (breed) {
        catData = await getCatFromApi(breed);
      } else if (image) {
        catData = await getCatFromApi(image);
      } else {
        catData = await getCatFromApi(name);
      }

      if (!catData) {
        return res.status(404).json({ message: "Cat Data not found" });
      }

      // Prepare Gemini Input
      const geminiInput = {
        ...catData,
        name: name || "Little Friend"
      };

      // Get AI response (Now returns a JSON object thanks to our new prompt)
      const geminiResult = await getGeminiApiData(geminiInput);

      // Return clean, structured data for Frontend
      res.status(200).json({
        cat: {
          name: name || "Unknown",
          breed: catData.breed || breed,
          // Agar aap real photo dikhana chahti hain toh catData.image use karein, 
          // varna niche wala anime food GIF link use karein
          image: "https://i.pinimg.com/originals/82/30/11/823011a0f83691375d3368222955f756.gif", 
          food: geminiResult.food_name || "Special Magic Meal",
          health_tip: geminiResult.health_tip || "Stay hydrated!"
        }
      });

    } catch (error) {
      console.error("Controller Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default catController;