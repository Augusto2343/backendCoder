    import express from "express";
import handlebars from "express-handlebars";
import productosRouter from "./routes/productos.router.js";
import cartsRouter from "./routes/carts.router.js";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import viewsRouter from "./routes/views.router.js"
import mongoose from "mongoose";
const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))
app.engine("handlebars",handlebars.engine())
app.set("views",__dirname +"/views");
app.set("view engine", "handlebars");
app.use("/",viewsRouter)
const httpServer = app.listen(port,() =>{
    console.log("Servidor activo en puerto:",port);

    
})
mongoose.connect("mongodb+srv://augustodavidnoriega:Augus123@cluster0.9s6datl.mongodb.net/")
app.use("/api/products",productosRouter);
app.use("/api/carts",cartsRouter);
const socketServer = new Server(httpServer);
socketServer.on("connection",socket =>{
    console.log("Nuevo cliente conectado!");

    socket.on("subirProducto", async( newProduct) =>{
        let producto = JSON.stringify(newProduct);
        console.log("HOLAAAAA");
        try{
            const res = await fetch("http://localhost:5000/api/products",{
                method:"POST",
                headers:{ "Content-Type":"application/json"},
                body: producto
            })
            console.log("SE posteó :D");
            console.log(res);
            switch(res.status) {
                case 200:
                socketServer.emit("exitoVista",res)  
                break;
                default:
                socketServer.emit("errorVista",e )    
                break;
            }
        }catch(e){
            socketServer.emit("errorVista",e )    
        }
    })
    socket.on("updateProd", async(newProd,idProd) =>{
        let producto = JSON.stringify(newProd);
        
        
        try{
            const res = await fetch(`http://localhost:5000/api/products/${idProd}`,{
                method:"PUT",
                headers:{ "Content-Type":"application/json"},
                body: producto
            })
            console.log("Se updateó :D");
            console.log(res);
            switch(res.status) {
                case 200:
                socketServer.emit("exitoVista",res)  
                break;
                case 404:
                socketServer.emit("notFoundVista",res)
                break;
                default:                
                socketServer.emit("errorVista",e )    
                break;
            }
        }catch(e){
            socketServer.emit("errorVista",e )    
        }
    })
    socket.on("borrarProd",async(idProd) =>{
        
        try{
            const res = await fetch(`http://localhost:5000/api/products/${idProd}`,{
                method:"DELETE",
            })
            console.log("Se elimino :D");
            console.log(res);
            switch(res.status) {
                case 200:
                socketServer.emit("exitoVista",res)  
                break;
                case 404:
                socketServer.emit("notFoundVista",res)
                break;
                default:
                socketServer.emit("errorVista",e )    
                break;
            }
        }catch(e){
            socketServer.emit("errorVista",e )    
        }
    })
})


