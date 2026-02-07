import dotenv from "dotenv";
dotenv.config();

const getCatFromApi = async (breed) => {
  try {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breed}`, 
      {
        headers: { "x-api-key": process.env.API_KEY }
      }
    );
    const data = await response.json();
    const cat = data[0];

    if (!cat || !cat.breeds || cat.breeds.length === 0) {
      return null;
    }

    return {
      image: cat.url,
      breed: cat.breeds[0]?.name,
      temperament: cat.breeds[0]?.temperament,
      origin: cat.breeds[0]?.origin,
      food: cat.breeds[0]?.food || "Any suitable cat food"
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default getCatFromApi;
