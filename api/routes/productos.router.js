import {Router} from "express";
import { passportCall } from "../middlewares/passport/passport-call.js";
import { productController } from "../controllers/productController.js";
import { isAdmin } from "../middlewares/is-auth.js";
export const productosRoutes = Router();   


productosRoutes.route("/")
    //Post
    .post(passportCall("current",{session:false}), productController.create)
 //getAll
      .get(passportCall("current",{session:false}),productController.getAll)

 productosRoutes.route("/:pid")
    //getById
    .get(passportCall("current",{session:false}),productController.getById)
  //Update
    .put(passportCall("current",{session:false}),isAdmin,productController.update)
 //Delete
 .delete(passportCall("current",{session:false}),isAdmin,productController.delete)
export default productosRoutes;