export default class MongoDao {
    constructor(model){
        this.model= model;
    }
    getById= async (id) =>{
        try {
            return await this.model.find(id);
        } catch (error) {
            throw new Error(error);
        }
    }
    
    create = async (body) =>{
        try {
            return await this.model.create(body);
        } catch (error) {
            throw new Error(error);
        }
    }
    update = async (id,body) =>{
        try{ 
            return await this.model.findIdAndUpdate(id,body, {new:true})
        }
        catch{
            throw new Error(error);
        }
    }
    
    delete = async (id) =>{
        try{ 
            return await this.model.findByIdAndDelete(id)
        }
        catch{
            throw new Error(error);
        }
    }
}