import { Router } from "express";
import {userController} from "../controllers/userController.js"
import { passportCall } from "../middlewares/passport/passport-call.js";
const router = Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.get("/session/current", passportCall("current",{session:false}) ,(req,res)=>{
    res.send(req.user)
})
export default router;