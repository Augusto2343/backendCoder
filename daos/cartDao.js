import cartModel from "./models/cartModel.js";
import MongoDao from "./mongo-dao.js";
class CartDao extends MongoDao{
    constructor(model){
        super(model);
    }

}
export const cartDao = new CartDao(cartModel)