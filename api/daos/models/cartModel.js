import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const cartSchema = mongoose.Schema({
    products:{
        type:[
            {producto:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"products"
            },quantity:{default:1,type:Number}}
        ],default:[]  
    }

})
cartSchema.plugin(mongoosePaginate)
 const cartModel = mongoose.model("carts",cartSchema);
 export default cartModel;