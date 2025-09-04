import jwt from "jsonwebtoken";
import config from "../config/config.js";
import {userDao} from "../daos/user-dao.js";
import { cartDao } from "../daos/cartDao.js";
import CustomError from "../utils/custom-error.js";
import { createHash,isValidPassword } from "../utils/user-utils.js";

class UserRepository{
    constructor(dao,carts){
        this.dao = dao;
        this.carts = carts
    }
    
    register= async(body)=>{
        try {
;
            
            const{email,password}= body;
            const existUser= await this.dao.getByEmail(email);
            if (existUser) throw new CustomError("El usuario ya existe",400);
            const cartId = await this.carts.create();
            if(!cartId) return new CustomError("Error al crear el carrito");
            const response = await this.dao.create({
                ...body,
                cartId:cartId,
                password:createHash(password)
            })
            if(!response) throw new CustomError("Error al crear el usuario",400);
            return await response;
        } catch (error) {
            throw error;
        }
    }
    generateToken= (user) =>{
        const payload  ={
            first_name: user.first_name,
            last_name:user.last_name,
            email:user.email,
            role: user.role,
            cartId:user.cartId
        }
        return jwt.sign(payload, config.SECRET_KEY,{
            expiresIn:"19m"
        })
    }
    login = async(email,password) =>{
        try{ 
            const userExist = await this.dao.getByEmail(email);
            if(!userExist) throw new CustomError("Credenciales incorrectas",400);
            const passValid = isValidPassword(password,userExist.password);
            if(!passValid) throw new CustomError("Credenciales incorrectas",400);
            return userExist;

    }catch(error){
        throw error;
    }
}
}
export const userRepository= new UserRepository(userDao, cartDao)