import mongoose, { mongo } from "mongoose";
import { cartRepository } from "../repositories/cartRepositories.js";
import CustomError from "../utils/custom-error.js";
import { productRepository } from "../repositories/productRepositories.js";
class CartService{
    constructor(repository){
        this.repo = repository;
        this.prodRep= productRepository;
    }
    getById = async(id)=>{
        try{
            let idCart = new mongoose.Types.ObjectId(id)
            const cart = await this.repo.getById(idCart);
            if(!cart) throw new CustomError("No se encontró el carrito",404)
            return cart
        }  
        catch(e){
            throw e
        } 
    }
    create = async(cart) =>{
        try {
            const newCart =await this.repo.create(cart);
            console.log(newCart);
            return newCart
        } catch (error) {
            throw error
        }
        
    }
    delete = async(cart) =>{
        try {
            const response = await this.repo.delete(cart)
            console.log(response);
            if(!response) throw new CustomError("No se encontró el carrito",404)
            return response;
        } catch (error) {
            throw error
        }
    }
    postProduct = async(id,prod) =>{
        try {
            let prodId = new mongoose.Types.ObjectId(prod)
            let product = await this.prodRep.getById(prodId);
            if(!product)  throw new CustomError("Producto no encontrado",404)
            if(!product.stock > 0)  throw new CustomError("Stock insuficiente",400)
            product.stock = product.stock -1;
            console.log(product);
            
            let modifyProd = await this.prodRep.update(prodId,product)
            if(!modifyProd)  throw new CustomError("Error al modificar el producto",500)
            let idCart = new mongoose.Types.ObjectId(id)
            return await this.repo.postProduct(idCart,prod)
        } catch (error) {
            throw error
            
        }
    }
    deleteProduct = async(id,prod) =>{
        try {
            let prodId = new mongoose.Types.ObjectId(prod)
            let product = await this.prodRep.getById(prodId);
            if(!product)  throw new CustomError("Producto no encontrado",404)
            product.stock = product.stock +1;
            console.log(product);
            
            let modifyProd = await this.prodRep.update(prodId,product)
            if(!modifyProd)  throw new CustomError("Error al modificar el producto",500)
            let idCart = new mongoose.Types.ObjectId(id)
            return await this.repo.deleteProduct(idCart,prod)
        } catch (error) {
            throw error
            
        }
    }
}
export const cartService = new CartService(cartRepository)