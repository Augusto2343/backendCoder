import { userService } from "../services/userService.js";

class UserController {
    constructor(service) {
        this.service = service;
    }

    register = async (req,res,next)=>{
        try {
            const response = await this.service.register(req.body);
            console.log(response.first_name);
            res.status(200).send("Usuario registrado");
        } catch (error) {
            next(error);   
            
        }
    }
    login= async (req,res,next) =>{
        try {

            
            const {email, password} = req.body;
            const user = await this.service.login(email,password);
            const token = this.service.generateToken(user);
            res.cookie("token",token,{httpOnly:true});
            return res.status(200).send("Logueado correctamente");
        } catch (error) {
            next(error);   
            
        }
        
    }
    infoSession  = async(req,res,next)=>{
        try {
            res.json({
                session:req.session,
                sessionId:req.sessionID,
                cookies:req.cookies
            })
        } catch (error) {
            next(error)
        }
    }
    logout = async(req,res,next)=>{
        try {
            res.clearCookie("token");
            res.status(200).send("Deslogueado correctamente");
        } catch (error) {
            next(error);
        }
    }
}
export const userController = new UserController(userService);