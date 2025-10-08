import { Router } from "express";
import { ticketController } from "../controllers/ticketController.js";
import { verifyToken } from "../middlewares/is-auth.js";
import { passportCall } from "../middlewares/passport/passport-call.js";

const router = Router();

router.post("/:idCart/:emailUser",passportCall("current",{session:false}),ticketController.create)
router.get("/:id",passportCall("current",{session:false}),ticketController.getById)

export default router