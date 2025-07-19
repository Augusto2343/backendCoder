import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productosSchema = new mongoose.Schema({

        title:{type:String,require:true},
        description:{type:String,require:true},
        code:{type:String,require:true},
        price:{type:Number,require:true},
        status:{type:Boolean,
            default:true
        },
        stock:{type:Number,require:true},
        category:{type:String,require:true},
        thumbnail:{
            type:String,
            default:""
        }
    
})
productosSchema.plugin(mongoosePaginate)
const productosModel = mongoose.model("products",productosSchema);

export default productosModel;