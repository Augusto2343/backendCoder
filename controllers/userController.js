
import { response } from "express";
import { userRepository} from "../repositories/userRepositories.js";

class UserController {
    constructor(repository) {
        this.repository = repository;
    }

    register = async (req,res,next)=>{
        try {
            const response = await this.repository.register(req.body);
            console.log(response.first_name);
            res.redirect(`/login?name=${response.first_name}&&message=User created succesfullly`)
        } catch (error) {
            next(error);   
            return res.redirect(`/login?error=${error}`)
        }
    }
    login= async (req,res,next) =>{
        try {

            const {email, password} = req.body;
            const user = await this.repository.login(email,password);
            const token = this.repository.generateToken(user);
            res.cookie("token",token,{httpOnly:true});
            return res.redirect("http://localhost:5000/");
        } catch (error) {
            next(error);   
            return res.redirect(`/login?error=${error}`)
            
        }
        
    }
}
export const userController = new UserController(userRepository);