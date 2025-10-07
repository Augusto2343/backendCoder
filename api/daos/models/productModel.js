import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productosSchema = new mongoose.Schema({

        title:{type:String,required:true},
        description:{type:String,required:true},
        code:{type:String,required:true},
        price:{type:Number,required:true},
        status:{type:Boolean,
            default:true
        },
        stock:{type:Number,required:true},
        category:{type:String,required:true},
        thumbnail:{
            type:String,
            default:""
        }
        
})
productosSchema.plugin(mongoosePaginate)
const productosModel = mongoose.model("products",productosSchema);

export default productosModel;