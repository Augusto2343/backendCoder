import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { cartRepository } from "../repositories/cartRepositories.js";
import { userRepository } from "../repositories/userRepositories.js";
import CustomError from "../utils/custom-error.js";
import { createHash,isValidPassword } from "../utils/user-utils.js";
import mongoose from "mongoose";

class UserService {
    constructor(repository,cartRepo){
        this.repo = repository;
        this.cart= cartRepo
    }
    getByRefreshToken= async(token)=>{
        try {
            return await this.repo.getByRefreshToken(token)
        } catch (error) {
            throw error;
        }
    }
        /**
         *  Recibe por el body la password, el email, la edad , nombre, apellido, busca el email en la base de datos ya que si se encuentra retorna un error , despues crea un carrito vacío y con el id del carrito crea el usuario con el contenido del body mas la password hasheada y el id del carrito.
         * @param {object} body 
         * @returns {response} 
         *      */
        register= async(body)=>{
            try {
    ;
                
                const{email,password}= body;
                const existUser= await this.repo.getByEmail(email);
                if (existUser) throw new CustomError("El usuario ya existe",400);
                const cartId = await this.cart.create();
                if(!cartId) return new CustomError("Error al crear el carrito");
                const response = await this.repo.create({
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
        /**
         * Esta función genera el token del usuario para mantenerse logueado por 19 minutos.
         * @param {object} user 
         * @returns {JsonWebKey}
         */
        generateToken= (user) =>{
            const payload  ={
                first_name: user.first_name,
                last_name:user.last_name,
                email:user.email,
                role: user.role,
                age:user.age,
                imgProfile:user.imgProfile,
                cartId:user.cartId
            }
            return jwt.sign(payload, config.SECRET_KEY,{
                expiresIn:"19m"
            })
        }
        /**
         * Esta función comprueba los datos ingresados y los compara con los datos buscados en el servidor por su email.
         * @param {string} email 
         * @param {string}password
         * @returns {userExist}
         */
        login = async(email,password) =>{
            try{ 
                const userExist = await this.repo.getByEmail(email);
                if(!userExist) throw new CustomError("Credenciales incorrectas",400);
                const passValid = isValidPassword(password,userExist.password);
                if(!passValid) throw new CustomError("Credenciales incorrectas",400);
                return userExist;
    
        }catch(error){
            throw error;
        }
    }

}
export const userService = new UserService(userRepository,cartRepository)