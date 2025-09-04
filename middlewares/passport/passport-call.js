import passport from "passport";

export const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, options, (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                const msg = { 
                    error: info.messages ? info.messages : info.toString() 
                }
                console.log(msg.error);
                
                res.redirect(`http://localhost:5000/login?error=${encodeURIComponent(msg.error)}`)
            }
            
            req.user = user;
            next();
        })(req, res, next);
    }
}