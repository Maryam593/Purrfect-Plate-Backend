import express from "express";
import catRouter from "./routes/catRoutes.js";
import dotenv from "dotenv"
import cors from "cors"
dotenv.config()
const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(cors())
app.use("/api", catRouter); // all routes in catRouter prefixed with /api
app.get("/", (req, res) => {
  res.send("Cat Cuisine Backend is running!");
});
app.listen(port, () => {
  console.log(`Server is working on port ${port}`);
});
