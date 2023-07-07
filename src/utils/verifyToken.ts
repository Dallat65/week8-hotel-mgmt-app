import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken";
import createHttpError, {HttpError} from "http-errors";

export const verifyToken = (req:JwtPayload, res:Response, next:NextFunction) =>{
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
    
    if(!token){
        return next(createHttpError(401, "You are not authenticated"))
    }
    jwt.verify(token, process.env.JWT as string, (err:any, user:any) =>{
        if (err) return next(createHttpError(403, "Token is not valid"));
        req.user = user;
        next()
    });
}

export const verifyUser = (req:JwtPayload, res:Response, next:NextFunction) =>{
        if (req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            return next(createHttpError(403, "You are not authorised"));

        }
}
