import mongoose from "mongoose";
import { productRepository } from "../repositories/productRepositories.js";
import CustomError from "../utils/custom-error.js";

class ProductService {
    constructor(repository){
        this.repo = repository
    }
    getAll = async(limit)=>{
        try {
            console.log(limit);
            
            let docsLimit=0
            try {
                docsLimit = parseInt(limit); 
                if(!docsLimit) docsLimit = 15 
            } catch (error) {
                docsLimit=15
            } 
            console.log(docsLimit)
            const response = await this.repo.getAll(docsLimit);
            if(!response) throw new CustomError("Error al obtener los productos",500)
            return response
        } catch (error) {
            throw error;
        }
    }
    getById = async(id) =>{
        try{
            const idProd = new mongoose.Types.ObjectId(id);
            const product = await this.repo.getById(idProd);
            if(!product) throw new CustomError("No se encontró el producto",404);
            return product    
        }
        catch(e){
            throw e;
        }
    }
    delete= async(id) =>{
        try {
            let idProd = new mongoose.Types.ObjectId(id);
            const response = await this.repo.delete(idProd);
            if(!response) throw new CustomError("Producto no encontrado",404)
            return response
        } catch (error) {
            throw error
        }
    }
    create = async(title,description,code,price,status,stock,category,thumbnail) =>{
        try{
            let parsedStock =0
            let parsedPrice=0;
            try {
                
            if(typeof stock !== "number" )  parsedStock = parseInt(stock)
            else parsedStock = stock;
            if(typeof price !== "number")  parsedPrice = parseInt(price)
            else parsedPrice = price
                console.log(typeof(price), typeof(stock));
            } catch (error) {
             throw new CustomError("Los tipos de datos ingresados son incorrectos.",400)
                
            }
            
            if( typeof title !=="string" ||
            typeof description !=="string" ||
            typeof code !=="string" ||
            typeof status !== "boolean" ||
            typeof category !=="string" ){
            throw new CustomError("Los tipos de datos ingresados son incorrectos.",400)
            }
            const product = {title:title, description:description, code:code, price:parsedPrice, status:status, stock:parsedStock, category:category, thumbnail:thumbnail}
            const response = this.repo.create(product);
            if(!response) throw new CustomError("Error al crear el producto",500)
            return response
        }catch(error){
            throw error
        }
    }
    update = async(id,body) =>{
        try {
            if(!id) throw new CustomError("Faltan parámetros",400);
            const idProd = new mongoose.Types.ObjectId(id);
            console.log(body);
            
            const response = await this.repo.update(idProd,body);
            if(!response) throw new CustomError("No se pudo actualizar el producto",500);
            return response;
        } catch (error) {
            throw error;
        }
    }
}
export const productService = new ProductService(productRepository)