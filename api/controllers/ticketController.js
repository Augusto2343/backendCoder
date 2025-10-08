import { ticketService } from "../services/ticketService.js";
class TicketController {
    constructor(service){
        this.service= service;
    }
    create = async(req,res,next)=>{
        const {idCart,emailUser}= req.params;
        console.log(idCart,emailUser);
        const response =await this.service.create(idCart,emailUser)
        console.log(response);
        
    }
}
export const ticketController = new TicketController(ticketService)