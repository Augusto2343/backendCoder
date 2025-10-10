import { productService } from "../services/productService.js";
import CustomError from "../utils/custom-error.js";

class ProductController{
    constructor(service){
        this.service = service;
    }
    getById = async(req,res,next)=>{
        try {
            let {pid} = req.params;
            const response =await this.service.getById(pid);
            if(!response) throw new CustomError("Producto no encontrado",404)
            return res.send(response)
        } catch (error) {
            next(error)
        }
    }
    create = async(req,res,next)=>{
        try {
            console.log(req.body);
            
            let {title,description,code,price,status,stock,category,thumbnail} = req.body;
            
            return res.send(await  this.service.create(title,description,code,price,status,stock,category,thumbnail))
        } catch (error) {
            next(error)
        }
    }
    getAll = async(req,res,next)=>{
        try {
            let limit = req.query.limit;
            
            return res.send(await this.service.getAll(limit))
        } catch (error) {
            next(error);
        }
    }
    delete= async(req,res,next)=>{
      try {
        let {pid} = req.params;
        const response =await this.service.delete(pid);
        return res.send(response)
      } catch (error) {
        throw error;
      }  
    }
    update = async(req,res,next) =>{
        try {
            const {pid} = req.params;
            
            const {title,description,code,price,status,stock,category,thumbnail} = req.body;
            const body = {title:title,description:description,code:code,price:price,status:status,stock:stock,category:category,thumbnail:thumbnail}
            return res.send(await this.service.update(pid,body)) 
        } catch (error) { 
            next(error);
        }
    }
}

export const productController = new ProductController(productService);