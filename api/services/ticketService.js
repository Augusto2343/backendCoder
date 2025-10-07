import { ticketRepository } from "../repositories/ticketRepositories.js";
import {cartService} from "./cartService.js";
import {productService} from "./productService.js"
class TicketService {
    constructor(repository){
        this.repo=repository
    }
    create = async(cartId,idUser)=>{
        const cart = await cartService.getById(cartId);
        const productsId = cart[0].products;
        let total = 0;
        console.log( productsId);

        productsId.forEach(async(product) => {
            let quantity = product.quantity;
            let productId= product.producto;
            let productItem = await productService.getById(productId);
            console.log("Cantidad: ",quantity,"productId: ", productId);
            console.log(productItem);
            
            if(productItem.stock < quantity ){
                return new Error("No se puede agregar el producto")
            }
            total +=productItem.price;
        });
        console.log(total);
        
    }
}
export const ticketService = new TicketService(ticketRepository)