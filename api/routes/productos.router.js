import {Router} from "express";
import { passportCall } from "../middlewares/passport/passport-call.js";
import { productController } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/is-auth.js";
export const productosRoutes = Router();   


productosRoutes.route("/")
    //Post
    .post(passportCall("current",{}), productController.create)
 //getAll
      .get(passportCall("current",{}),productController.getAll)

 productosRoutes.route("/:pid")
    //getById
    .get(passportCall("current",{}),productController.getById)
  //Update
    .put(passportCall("current",{}),isAdmin,productController.update)
 //Delete
 .delete(passportCall("current",{}),isAdmin,productController.delete)
export default productosRoutes;