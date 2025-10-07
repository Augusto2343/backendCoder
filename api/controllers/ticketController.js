import { ticketService } from "../services/ticketService.js";
class TicketController {
    constructor(service){
        this.service= service;
    }
    create = async(req,res,next)=>{
        const {idCart,user} = req.body;
        console.log(idCart,user);
        const response =await this.service.create(idCart,user)
        console.log(response);
        
    }
}
export const ticketController = new TicketController(ticketService)