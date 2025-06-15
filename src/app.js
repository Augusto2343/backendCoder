import express from "express";
import productosRouter from "./routes/productos.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.listen(port,() =>{
    console.log("Servidor activo en puerto:",port);
    
})
app.use("/api/products",productosRouter);
app.use("/api/carts",cartsRouter);
