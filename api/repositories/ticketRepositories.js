import { ticketDao } from "../daos/ticketDao.js";

class TicketRepository {
    constructor(dao){
        this.dao = dao;
    }

    create= async(invoice) =>{
        try {
            return await this.dao.create(invoice)
        } catch (error) {
            throw error
        }
    }
    getById = async(id) =>{
        try {
            return await this.dao.getById(id);
        } catch (error) {
            throw error;
        }
    }
}
export const ticketRepository = new TicketRepository(ticketDao)