import { ticketDao } from "../daos/ticketDao.js";

class TicketRepository {
    constructor(dao){
        this.dao = dao;
    }

    create= async() =>{
        console.log("AIAIAI");
        
    }
}
export const ticketRepository = new TicketRepository(ticketDao)