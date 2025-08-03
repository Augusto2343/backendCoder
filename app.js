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
//definición de variable cartId
let cartId="";
//Conexión con mongoose
mongoose.connect("mongodb+srv://augustodavidnoriega:Augus123@cluster0.9s6datl.mongodb.net/")
//Definición de rutas
app.use("/api/products",productosRouter);
app.use("/api/carts",cartsRouter);

//Socket 
const socketServer = new Server(httpServer);
socketServer.on("connection",async socket =>{

    
    console.log("Nuevo cliente conectado!");

    
    //Gestión de productos 
    //Subir producto
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
    //Actualizar producto
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
    //Borrar producto
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

    //Gestion de carrito

    socket.on("addProd",async (idCart,idProd)=>{
        console.log("ID Cart:",idCart,"ID prod:",idProd);
        const res = await fetch(`http://localhost:5000/api/carts/${idCart}/product/${idProd}`,{
            method:"POST"
        })
        if(res.status==200){
        console.log(res.status);

            socket.emit("exitoVista")
        }
        
    })
    socket.on("deleteProd",async (idCart,idProd)=>{
        console.log("ID Cart:",idCart,"ID prod:",idProd);
        const res = await fetch(`http://localhost:5000/api/carts/${idCart}/product/${idProd}`,{
            method:"DELETE"
        })
        socket.emit("exitoVista");
     
    })
    
    socket.on("deleteCart", async(idCart)=>{
        const res = await fetch(`http://localhost:5000/api/carts/${idCart}`,{
            method:"DELETE"
        })
    console.log(res);
        if(res.status == 200){
            socket.emit("carritoBorrado")
        };

    })

})
