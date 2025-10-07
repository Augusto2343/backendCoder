import { httpResponse } from "../utils/httpResponse.js";
import CustomError from "../utils/custom-error.js";
export const errorHandler = (error,req,res,next) =>{
    console.error(error);
    if(error instanceof CustomError) return httpResponse.CustomError(res,error);
    return httpResponse.InternalServErr(res,error)
}