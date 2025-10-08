
import {userDao} from "../daos/user-dao.js";
import { cartDao } from "../daos/cartDao.js";

class UserRepository{
    constructor(dao,carts){
        this.dao = dao;
        this.carts = carts
    }
    getByRefreshToken = async(token) =>{
        try {
            return await this.dao.getByRefreshToken(token)
        } catch (error) {
            throw error;
        }
    }
    getByEmail = async(email) =>{
        try {
            return await this.dao.getByEmail(email)
        } catch (error) {
            throw error
        }
    }    
    create = async(body) =>{
        try {
            return await this.dao.create(body)
        } catch (error) {
            throw error;
        }
    }
    update = async(id,body)=>{
        try {
    
            return await this.dao.update(id,body)
            
        } catch (error) {
            throw error;
        }
    }
}
export const userRepository= new UserRepository(userDao, cartDao)