import {Router} from "express";

import { cartController } from "../controllers/cartController.js";
import { passportCall } from "../middlewares/passport/passport-call.js";
export const cartsRoutes = Router();


//Metodo Post 
cartsRoutes.post("/",passportCall("current",{session:false}),cartController.create)
//Metodo get by id
cartsRoutes.get("/:cid",passportCall("current",{session:false}),cartController.getById)
// Metodo delete
cartsRoutes.delete("/:cid",passportCall("current",{session:false}),cartController.delete)
//Método deleteProd 
cartsRoutes.delete("/:cid/product/:pid",passportCall("current",{session:false}),cartController.deleteProduct)
// Método postProd
cartsRoutes.post("/:cid/product/:pid",passportCall("current",{session:false}), cartController.postProduct)

export default cartsRoutes;