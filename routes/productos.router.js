import {Router} from "express";
import {readFile,writeFile} from "fs/promises"
import productModel from "../models/productModel.js";

export const productosRoutes = Router();
   
    const modificarProducto = async(pid,title,description,code,price,status,stock,category,thumbnail)=>{
        console.log(title,description,code,price,status,stock,category);
        
        
        
        let oldProd =await productModel.findOne({_id:pid});
        console.log(oldProd);
        
        let item= {title: title== undefined? oldProd.title : title,
                       description: description == undefined ? oldProd.description :description ,
                       code: code == undefined? oldProd.code :code,
                       price: price == undefined ? oldProd.price :price,
                       status: status == undefined ? oldProd.status :status,
                       stock :stock == undefined ? oldProd.stock :stock,
                       category :category == undefined ? oldProd.category : category,
                       thumbnail :thumbnail == undefined ? oldProd.thumbnail :thumbnail,
                       id: oldProd.id
                    }
      
            console.log(item);
        let newItem = await productModel.updateOne({_id:pid},item)
        console.log(newItem);
        return newItem;
        
    }

    
//Get all
productosRoutes.get("/", async (req,res)=>{
    const limit = parseInt(req.query.limit);
    if(limit != undefined){
    let productos = await productModel.find().limit(limit);
    res.send(productos);
    }

    else{
    let productos = await productModel.find();
    res.send(productos);

    }
})
//Get by id
productosRoutes.get("/:pid", async (req,res) =>{
    let {pid}= req.params;
    
       let productToShow = await productModel.findOne({_id:pid});
       console.log(productToShow);
       
       if(productToShow){
        res.send(productToShow);
       } 
       else{
        res.status(404).send("No se encontró el producto");
       }
    
    
})
//Post
 productosRoutes.post("/", async (req,res) =>{
     const {title,description,code,price,status,stock,category,thumbnail} =req.body;
     
     if( typeof title !=="string" && 
         typeof description !=="string" &&
         typeof title !=="string" && 
         typeof code !=="string" && 
         typeof price !=="number" && 
         typeof stock !=="number" && 
         typeof category !=="string" ){
         res.status(400).send("Error se ha ingresado un tipo de dato incorrecto")
         }
     else{
        console.log(title);
        console.log(description);
        console.log(code);


        
        const newProducto = await productModel.create({title:title,description:description,code:code,price:price,status:status,stock:stock,category:category,thumbnail:thumbnail})
        res.send(newProducto)
    }
 })
 //Update
 productosRoutes.put("/:pid",(req,res) =>{
    let {pid} = req.params;
    

    const {title,description,code,price,status,stock,category,thumbnail} =req.body;
    let productoModif = modificarProducto(pid,title,description,code,price,status,stock,category,thumbnail)
    res.send("producto modificado",productoModif)    
 })
 //Delete
 productosRoutes.delete("/:pid", async(req,res) =>{
    let {pid} =req.params;
    let response = await productModel.deleteOne({_id:pid})
    console.log(response);
    res.send(response)
    
 })
export default productosRoutes;