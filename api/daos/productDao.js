import productosModel from "./models/productModel.js";
import MongoDao from "./mongo-dao.js";
class ProductDao extends MongoDao{
    constructor(model){
        super(model);
    }
    getLim = async (limit) =>{
        try {
            return await this.model.find().limit(limit)
        } catch (error) {
             throw error
        }
    }
}
export const productDao = new ProductDao(productosModel)