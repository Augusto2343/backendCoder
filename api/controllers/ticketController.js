import { ticketService } from "../services/ticketService.js";
import { userService } from "../services/userService.js";
class TicketController {
    constructor(service){
        this.service= service;
    }
    create = async(req,res,next)=>{
        const {idCart,emailUser}= req.params;
  
        try{
            const { ticket, updatedUser } = await this.service.create(idCart,emailUser)
            const token = userService.generateToken(updatedUser);
            res.cookie("token", token, {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 19*600*1000
            });
            return res.status(201).json(ticket);
        }catch(error){
            next(error)
        }
    }
    getById = async(req,res,next) =>{
        try {
            const {id} = req.params;
            const user = req.user;

            const response = await this.service.getById(id,user);

            return res.status(200).json(response);
        } catch (error) {
            next(error)
        }
    }
}
export const ticketController = new TicketController(ticketService)