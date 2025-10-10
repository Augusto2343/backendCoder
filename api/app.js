import express from "express";

import cookieParser from "cookie-parser";
import productosRouter from "./routes/productos.router.js";
import cartsRouter from "./routes/carts.router.js";
import userRouter from "./routes/usersRouters.js";
import __dirname from "./utils.js";
import {Server} from "socket.io";
import mongoose from "mongoose";
import config from "./config/config.js";
import "./middlewares/passport/passport-jwt.js";
import passport from "passport";
import cors from "cors";
import ticketRouter from "./routes/ticketRouter.js"
import { errorHandler } from "./middlewares/error-handler.js";
const app = express();
const port = config.PORT;
let originsUrls=( config.FRONT_API_URL).split(",")



app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + "/public"))

app.use(cors({
    origin:originsUrls,
    credentials:true
}))
const httpServer = app.listen(port,() =>{
    console.log("Servidor activo en puerto:",port);

    
})
//Inicializacion de cookieparser
app.use(cookieParser());
//Inicializacion de passport 
app.use(passport.initialize());
//definición de variable cartId
let cartId="";
//Conexión con mongoose
mongoose.connect(config.MONGO_URL).then(() =>console.log("DB conectada")).catch("Error en la conexión con la DB")
//Definición de rutas
app.use("/api/products",productosRouter);
app.use("/api/carts",cartsRouter);
app.use("/api/ticket",ticketRouter)
app.use("/api",userRouter)
app.use(errorHandler)