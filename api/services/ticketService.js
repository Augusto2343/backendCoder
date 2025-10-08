import { ticketRepository } from "../repositories/ticketRepositories.js";
import { userRepository } from "../repositories/userRepositories.js";
import CustomError from "../utils/custom-error.js";
import {cartService} from "./cartService.js";
import {productService} from "./productService.js"
class TicketService {
    constructor(repository){
        this.repo=repository
    }
    create = async(cartId,emailUser)=>{
        const date =new Date();
        const fecha = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        const cart = await cartService.getById(cartId);
        const user = await userRepository.getByEmail(emailUser);
        console.log(user);
        console.log(cart);
        if(!cart || !user) throw new Error("Carrito o usuario no encontrado");
        let total = 0;
        console.log(cart.products);
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
        console.log(invoice);
        const pushTicket = await this.repo.create(invoice)
        console.log(pushTicket);
        if(!pushTicket) throw new CustomError("Error al crear el ticket",500);
        await cartService.delete(cart._id);
        const addCart = await cartService.create();
        console.log(addCart._id);
        
        if(!addCart) throw new CustomError("Error al crear un carrito nuevo",500);

        const modifyUser = await userRepository.update(user._id, {cartId: addCart._id});
        if(!modifyUser) throw new CustomError("Error al modificar el usuario",500);
        console.log(modifyUser);
        

    }
}
export const ticketService = new TicketService(ticketRepository)