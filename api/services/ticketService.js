import mongoose from "mongoose";
import { ticketRepository } from "../repositories/ticketRepositories.js";
import { userRepository } from "../repositories/userRepositories.js";
import CustomError from "../utils/custom-error.js";
import {cartService} from "./cartService.js";
import {productService} from "./productService.js"
import { userService } from "./userService.js";
class TicketService {
    constructor(repository){
        this.repo=repository
    }
    getById = async (id,user) =>{
        try {

            const idInvoice = new mongoose.Types.ObjectId(id);

            const response = await this.repo.getById(idInvoice);
 
            if(!response) throw new CustomError("NO se pudo encontrar el invoice",404);
                    
            if(response.purchaser != user.email) throw new CustomError("No eres el propietario de este ticket",400);
            
            return response;

        } catch (error) {
            throw error
        }
    }

    create = async(cartId,emailUser)=>{
        try{
            const date =new Date();
            const fecha = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
            const cart = await cartService.getById(cartId);
            const user = await userRepository.getByEmail(emailUser);

            if(!cart || !user) throw new Error("Carrito o usuario no encontrado");
            let total = 0;
            let productos = cart.products;
            let prods = []
            
            productos.forEach(p => {
               let prod = p.producto
               let proObj = {id:prod._id,price:prod.price,quantity:p.quantity}
                prods.push(proObj)
                total += prod.price*p.quantity
    
            
            });
            const code= `CM${fecha}${cart._id}`
            let invoice = {
                code:code,
                purchase_datetime:fecha,
                products:prods,
                purchaser:emailUser,
                amount:total
            }
            const pushTicket = await this.repo.create(invoice)
            if(!pushTicket) throw new CustomError("Error al crear el ticket",500);
            await cartService.delete(cart._id);
            const addCart = await cartService.create();
            
            if(!addCart) throw new CustomError("Error al crear un carrito nuevo",500);
            let arrayTickets = user.tickets;
            arrayTickets.push(pushTicket._id)
            
            const modifyUser = await userService.update(user._id, {tickets:arrayTickets, cartId: addCart._id});
            if(!modifyUser) throw new CustomError("Error al modificar el usuario",500);
           
            return { ticket: pushTicket, updatedUser: modifyUser }
        }
        catch(e){
            throw e
        }
        
        

    }
}
export const ticketService = new TicketService(ticketRepository)