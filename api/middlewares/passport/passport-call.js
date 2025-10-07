import passport from "passport";
import CustomError from "../../utils/custom-error.js";

export const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, options, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                const msg = { 
                    error: info.messages ? info.messages : info.toString() 
                }
                console.log(msg.error);
                
                next( new CustomError(`No está logueado, ingrese al siguiente link: http://localhost:5000/login?error=${encodeURIComponent(msg.error)}`,401))
            }
            
            req.user = user;
            next();
        })(req, res, next);
    }
}