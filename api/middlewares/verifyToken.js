import config from "../config/config.js";
import CustomError from "../utils/custom-error.js";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepositories.js";

export const verifyToken = async (req,res,next) =>{
    try {
        const tokenCookie = req.cookies?.token;
        if(!tokenCookie) throw new CustomError("No autorizado",401);
        jwt.verify(token,config.SECRET_KEY, async(err,payload)=>{
            if(err && err.name === "TokenExpiredError"){
                const refreshToken = req.cookies?.refreshToken;
                if(!refreshToken) throw new CustomError("No autorizado",401);
                const user = await userRepository.getByRefreshToken(refreshToken);
                if(!user) throw new CustomError("No autorizado",401);
                jwt.verify(refreshToken, config.SECRET_KEY, async(err,payload)=>{
                    if(err) throw new CustomError("No autorizado",401);
                    const accessToken = userRepository.generateToken(user,"20m");
                    res.cookie("token",accessToken,{httpOnly:true});
                    req.user = user;
                    next(res.redirect("/login"));
                })
            }else{
                req.user = user;
                next()
            }
            ;
        })
        
    } catch (error) {
        next(res.redirect("http://localhost:5000/login"));
    }
}