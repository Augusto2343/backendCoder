export default class MongoDao {
    constructor(model){
        this.model= model;
    }
    getById= async (id) =>{
        try {
            return await this.model.findOne(id);
        } catch (error) {
            throw error;
        }
    }
    
    create = async (body) =>{
        try {
            return await this.model.create(body);
        } catch (error) {
            throw error;
        }
    }
    update = async (id,body) =>{
        try{ 
            return await this.model.findByIdAndUpdate(id,body, {new:true})
        }
        catch(error){
            throw error;
        }
    }
    
    delete = async (id) =>{
        try{ 
            return await this.model.findByIdAndDelete(id)
        }
        catch(error){
            throw error;
        }
    }
}