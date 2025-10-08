import ticketModel from "./models/ticketModel.js";
import MongoDao from "./mongo-dao.js";
class TicketDao extends MongoDao{
    constructor(model){
        super(model);
    }
    getById = async(id) =>{
        try{
            return await this.model.findById(id);
        }catch(error){
            throw error;
        }
    }
}
export const ticketDao = new TicketDao(ticketModel)