import express from "express"
import productosModel from "../models/productModel.js";
import CartModel  from "../models/cartModel.js";
const viewRouter = express.Router();

 viewRouter.get("/", (req, res) =>{
      res.render("home");
 })

 //Vista lista productos
viewRouter.get("/products", async(req,res) =>{
    const {limit} = req.query;
    const {page} =req.query;
    console.log(limit);
    const productos = await productosModel.paginate({},{page:page ==undefined ? 1:page,limit:limit == undefined ? 10:limit,lean:true})

    
    res.render("products",{productos})
})
//Vista detalle de producto 
viewRouter.get("/products/:pid", async(req,res) =>{
    const {pid} = req.params;
    console.log(pid);
    
    const producto = await productosModel.paginate({_id:pid},{lean:true})
    console.log(producto);
    
    res.render("productDetails",{producto})
})

//Vista carrito
viewRouter.get("/carts/:cid", async(req,res) =>{
    const {cid} = req.params;
    
    try {
        const cart = await CartModel.findById(cid).populate('products.producto');
        if (!cart) {
            return res.status(404).send("Carrito no encontrado");
        }
        
        let products = cart.products.map(product => product.toObject());
        let idCart = cart._id;
        console.log(products);
        res.render("cart", { products,idCart });
    } catch (error) {
        console.error("Error loading cart:", error);
        res.status(500).send("Error interno del servidor");
    }
})
export default viewRouter