import getCatFromApi from "../services/catApi.js"
import getGeminiApiData from "../services/geminiApi.js";

 const catController = {
    catData : async(req,res) =>
    {try {
      const{name, breed, image}  = req.body
    if (!name && !breed && !image) 
    {
        res.status(404).json({message : "Please enter the data to get the desire result"})
    }
    let catData;
    if (breed) {
        catData = await getCatFromApi(breed)
    }
    else if (image) {
        catData = await getCatFromApi(image)
    }
    else {
        catData = await getCatFromApi(name)
    }
    if (!catData)
    {
        return res.status(404).json({message : "Cat Data not found"})
    }
    //for prompting 
    const geminiInput = {
        ...catData, name : name || "unknown"
    }
    const geminiResult = await getGeminiApiData(geminiInput)

    res.status(200).json({
        cat : catData,
        advice : geminiResult
    })  
    } catch (error) {
        res.status(500).json({message : "Internal server error"})
        console.log(error)
    }
 }}
export default catController