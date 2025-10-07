import CustomError from "../utils/custom-error.js"
import "dotenv/config";
import jwt from "jsonwebtoken";
export const verifyToken = async (req,res,next) =>{
    try {
        const tokenCookie = req.cookies.token;
        if(!tokenCookie) throw new CustomError("No autorizado",401);
        const payload = jwt.verify(tokenCookie,process.env.SECRET_KEY);
        
      console.log(payload);
        
        req.user = payload;
        next();
    } catch (error) {
        next(error);
    }
}
export const isAdmin = async(req,res,next) =>{
    try {
        const user = req.user;
        if(user.role == "admin")return next()
        return next( new CustomError("No autorizado",401))
    } catch (error) {
        throw error;
    }
}