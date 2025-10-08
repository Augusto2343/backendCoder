import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({

        first_name:{type:String,require:true},
        last_name:{type:String,require:true},
        email:{type:String,unique:true,require:true},
        age:{type:Number,require:true},
        password:{type:String, require:true},
        cartId:{type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true},
        role:{type:String,enum:["admin","user"],require:true, default:"user"},
        imgProfile:{type:String,default:""},
        tickets:{type:Array,default:[]}
        
        
})
const UserModel = mongoose.model("users",usersSchema);
export default UserModel;

