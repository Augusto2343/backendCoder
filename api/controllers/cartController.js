import{ cartService} from "../services/cartService.js"
class CartController {
    constructor(service){
        this.service = service;

    }
    getById = async(req,res,next) =>{
        try {
            const user = req.user;
            const {cid} = req.params;
            return res.send(await this.service.getById(cid))
        } catch (error) {
            next(error)
        }
    }
    delete = async (req,res,next) =>{
        try {
            const {cid} = req.params;
            return res.send(await this.service.delete(cid)) 
        } catch (error) {
            next(error)
        }
    }
    create = async(req,res,next) =>{
        try {
            const {cart} =req.body
            return res.send(await this.service.create(cart)) ;
        } catch (error) {
            next(error)
        }
    }
    postProduct = async(req,res,next) =>{
        try {
            const {cid,pid} =req.params;
            return res.send(await this.service.postProduct(cid,pid)) ;
        } catch (error) {
            next(error)
        }
    }

        deleteProduct = async(req,res,next) =>{
        try {
            const {cid,pid} =req.params;
            return res.send(await this.service.deleteProduct(cid,pid)) ;
        } catch (error) {
            next(error)
        }
    }
}

export const cartController = new CartController(cartService)