import express, { Request, Response, NextFunction } from "express"
import User from "../models/User"



export const updateUser = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedUser)
    }catch (err){
        next(err)   
    }
}
export const deleteUser = async (req:Request, res:Response, next:NextFunction) =>{

    try{
       await User.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Users has deen deleted")
    }catch (err){
        next(err)   
    }
}
export const getUser = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const user = await User.findById(
            req.params.id
            
        );
        if(!user) {
      return res.status(404).send("sorry not found!");

        }
        res.status(200).json(User)
    }catch (err){
        next(err)   
    }
}
export const getAllUsers = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const users = await User.find();
        res.status(200).json(users)
    }catch (err){
            // const error = new HttpError("sorry not found!", 404);
            next(err)   
        }
}