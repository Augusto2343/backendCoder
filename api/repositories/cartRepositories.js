import { cartDao } from "../daos/cartDao.js";

class CartRepository{
    constructor(dao){
        this.dao = dao;
    }
    getById = async(id) =>{
       try {
            return await  this.dao.getByIdPopulate(id);
        }
        catch(e) {
            throw new Error(e);
        }
    }
    delete = async(id)=>{
        try {
            return await this.dao.delete(id)
        } catch (error) {
            throw new Error(error)
        }
    } 
    create = async(cart) =>{
        try {
            return await this.dao.create(cart)
        } catch (error) {
            throw new Error(error)
        }
    }

    postProduct = async(id,prod) =>{
        try {
            return await this.dao.postProduct(id,prod)
        } catch (error) {
            throw new Error(error)
            
        }
    }

    deleteProduct = async(id,prod) =>{
        try {
            return await this.dao.deleteProduct(id,prod)
        } catch (error) {
            throw new Error(error)
            
        }
    }



}
export const cartRepository = new CartRepository(cartDao)