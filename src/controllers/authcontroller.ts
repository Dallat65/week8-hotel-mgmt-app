import express, { Request, Response, NextFunction, urlencoded } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export const register = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const saltRounds = 9;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username:req.body.username,
            email:req.body.email,
            password:hash
        })
        await newUser.save()
        res.status(200).send('User has been created.')
    }catch(err){
        next(err)
    }
}

export const login = async (req:Request, res:Response, next:NextFunction) =>{
    try{
        const user = await User.findOne({username:req.body.username})
        if (!user) return next (createHttpError(404, "User not found"))

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return next(createHttpError(400, "Wrong password or username"));

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin, username:user.username}, process.env.JWT as string)
        
                const {password, isAdmin, username, email,_id,createdAt,updatedAt,__v} = user;
            
                // console.log(user);
                
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json({
                username,
                email,
                token,
                _id,
                createdAt,
                updatedAt,
                __v
            });
    }catch(err){
        next(err);
    }
}