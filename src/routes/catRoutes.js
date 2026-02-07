import { Router } from "express";
import catController from "../controllers/cat.js";

const catRouter = Router()

catRouter.post("/catData", catController.catData )

export default catRouter