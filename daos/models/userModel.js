import mongoose from "mongoose";
const usersSchema = new mongoose.Schema({

        first_name:{type:String,require:true},
        last_name:{type:String,require:true},
        email:{type:String,unique:true,require:true},
        age:{type:Number,require:true},
        password:{type:String, require:true},
        cartId:{type: mongoose.Schema.Types.ObjectId, ref: "carts", required: true},
        role:{type:String,default:"admin"},
        
        
})
const UserModel = mongoose.model("users",usersSchema);
export default UserModel;

