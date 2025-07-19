import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const cartSchema = mongoose.Schema({
    products:{
        typeof:Array,
        default:[]    
    }
})
cartSchema.plugin(mongoosePaginate)
export const cartModel = mongoose.model("carts",cartSchema);