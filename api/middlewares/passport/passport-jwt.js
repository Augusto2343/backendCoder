import passport from "passport";
import {ExtractJwt , Strategy} from "passport-jwt"
import config from "../../config/config.js";

const cookieExtractor = (req) =>{
    return req.cookies.token;
}
const strategyConfigCookies = {
    jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey:config.SECRET_KEY
}
const verifyToken = async( jwt_payload, done) =>{
    try {
        
    if(!jwt_payload) return done(null,false,{messages:"User not found"});
    return done(null,jwt_payload);
    } catch (error) {
        done(error);
    }
}
passport.use("current", new Strategy(strategyConfigCookies,verifyToken));