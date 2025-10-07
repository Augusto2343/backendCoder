import { productDao } from "../daos/productDao.js";
class ProductRepository {
    constructor(dao){
        this.dao = dao;
    }
    getAll = async(limit) =>{
        try {
            return await this.dao.getLim(limit);

        } catch (error) {
           throw error; 
        }
    }
    getById = async(id) =>{
     try {
        return await this.dao.getById(id)
     } catch (e) {
        throw e
     }   
    }
    create = async(body) =>{
        try {
            return await this.dao.create(body);
        } catch (error) {
            throw error
        }
    }
    delete = async(id) =>{
        try {
            return await this.dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
    update = async(id,body) =>{
        try {
            return await this.dao.update(id,body)
        } catch (error) {
            throw error
        }
    }
}

export const productRepository = new ProductRepository(productDao)