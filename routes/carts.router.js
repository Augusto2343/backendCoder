import {Router} from "express";
import {readFile, writeFile} from "fs/promises";
import CartModel from "../models/cartModel.js";

import ProductosModel from "../models/productModel.js";
import cartModel from "../models/cartModel.js";
import mongoose from "mongoose";
export const cartsRoutes = Router();


//Metodo Post 
cartsRoutes.post("/", async (req,res) =>{
        const response = await CartModel.create({products:[]});   
        res.send(response._id);
})
//Metodo get by id
cartsRoutes.get("/:cid", async (req,res) =>{
    const {cid} = req.params;
    
    try {
        const carrito = await CartModel.findById(cid).populate('products.producto');
        if (!carrito) {
            return res.status(404).send("Carrito no encontrado");
        }
        console.log( carrito);
        res.send(carrito);
    } catch (error) {
        console.error("Error finding cart:", error);
        res.status(500).send("Error interno del servidor");
    }
})
// Metodo delete
cartsRoutes.delete("/:cid", async (req,res) =>{
    const {cid} = req.params;
    let validacion= await CartModel.deleteOne({_id:cid})
    console.log(validacion);
    
    res.send(validacion)

})
//Método deleteProd 
cartsRoutes.delete("/:cid/product/:pid", async (req,res) =>{
    const {cid,pid} = req.params;
    const carrito = await CartModel.findOne({_id:cid});
    
    const productosEnCarrito = carrito.products;
    let continuar = true;
    console.log("productosEnCarrito[0].producto._id",productosEnCarrito[0].producto);
    
    for(const element in productosEnCarrito) {
        console.log(element);
        
        if(productosEnCarrito[element].producto._id == pid){
            if(productosEnCarrito[element].quantity <= 1 || productosEnCarrito[element].quantity == 0){
                let productToModify = productosEnCarrito[element].producto;              
                const response= await CartModel.updateOne({ _id: cid },{ $pull: {'products':{ 'producto':productToModify } } });
                console.log(response);
                res.send(response);
                
                return continuar = false;
                
            }
            else{console.log(element);
                productosEnCarrito[element].quantity--;
            
                const response =await CartModel.updateOne({_id:cid,},{$set:{[`products.${element}.quantity`]:productosEnCarrito[element].quantity}});
                console.log("response",response);
                res.send(response);
                return continuar = false;
            }
        }
    }
    if(continuar){
        res.send("No se encontró el producto en el carrito")
    }
})
// Método postProd
cartsRoutes.post("/:cid/product/:pid", async (req, res) => {
    const { cid } = req.params;
    const { pid } = req.params;
    console.log("Cart ID:", cid, "Product ID:", pid);
    
    const product = ProductosModel.findOne({_id:pid});
    if(product){
        let continuar= true;
        let carrito = await CartModel.findOne({_id:cid});
        

        for (const e in carrito.products) {
            let idLocal =carrito.products[e].producto._id;
            if(idLocal == pid){
               carrito.products[e].quantity ++;
                const response = await CartModel.updateOne({_id:cid},carrito);
                continuar = false;
                res.send(response)
                break;
            }
            else{
                continuar= true;
            }
        }
           
            
        if(continuar ){
            carrito.products.push({producto: pid});
            const response = await CartModel.updateOne({_id:cid},carrito);
            res.send(response)
        }
        
    }
    
})
export default cartsRoutes;