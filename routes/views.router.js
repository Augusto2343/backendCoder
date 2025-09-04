import express from "express"
import productosModel from "../daos/models/productModel.js";
import CartModel  from "../daos/models/cartModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { passportCall } from "../middlewares/passport/passport-call.js";
const viewRouter = express.Router();

 viewRouter.get("/", passportCall("current",{session:false}),(req, res) =>{
    const payload = req.user;

      res.render("home",payload);
 })

 //Vista lista productos
viewRouter.get("/products", passportCall("current",{session:false}), async(req,res) =>{
    const {limit} = req.query;
    const {page} =req.query;
    console.log(limit);
    const productos = await productosModel.paginate({},{page:page ==undefined ? 1:page,limit:limit == undefined ? 10:limit,lean:true})

    
    res.render("products",{productos})
})
//Vista detalle de producto 
viewRouter.get("/products/:pid", passportCall("current",{session:false}),async(req,res) =>{
    const {pid} = req.params;
    console.log(pid);
    
    const producto = await productosModel.paginate({_id:pid},{lean:true})
    console.log(producto);
    
    res.render("productDetails",{producto})
})

//Vista carrito
viewRouter.get("/carts/:cid", passportCall("current",{session:false}), async(req,res) =>{
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
viewRouter.get("/login", (req,res) =>{
    const {error} =req.query;
    const {name,message} = req.query;
    console.log(error);
    console.log(name, message);
    
    res.render("login",{error,name,message});
})
viewRouter.get("/register",(req,res)=>{
    res.render("register");
})

viewRouter.get("/profile", passportCall("current",{session:false}) , (req,res) =>{
    const payload=req.user
    console.log(payload);
    res.render("profile", {payload})
})

export default viewRouter
