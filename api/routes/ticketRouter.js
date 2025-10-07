import { Router } from "express";
import { ticketController } from "../controllers/ticketController.js";
import { verifyToken } from "../middlewares/is-auth.js";

const router = Router();

router.post("/",verifyToken,ticketController.create)

export default router