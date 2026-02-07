import { GoogleGenerativeAI } from "@google/generative-ai"
import dotenv from "dotenv"
dotenv.config()
 const getGemini = new GoogleGenerativeAI (process.env.GEMINI_API_KEY)
const getGeminiApiData = async(cat) => {
const bot = getGemini.getGenerativeModel({model:"gemini-2.5-flash"})
const prompt = `you are an expert ${cat} vet. you know which ${cat} is of which ${cat.breed}. and which ${cat.food} is suit for that ${cat.breed}. also the food can be like home made or from any source. also which temperature is suit for which cat. like if they are living in hot country what breed suitable if they have to buy  a cat. like a complete vet. and if because of weather, or air cat caught a disease. you must generate some alerts and prescribe the medicines or remedies to protect their cats(pets). also you can be traslator of cat. like your cat wants this or your cat want this`

const result = await bot.generateContent(prompt)
const textResult = result.response.text()
return textResult
   
}

export default getGeminiApiData