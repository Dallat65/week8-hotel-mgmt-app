import express, { Request, Response, NextFunction } from "express"
import Hotel from "../models/Hotel"



export const CreateHotel = async (req:Request, res:Response, next:NextFunction) =>{

    const newHotel = await new Hotel(req.body)

    try{
        const savedHotel = await newHotel.save();
        return res.status(200).json(savedHotel)
    }catch (err){
    next(err)   
 }
}
export const updateHotel = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new: true}
        );
        res.status(200).json(updatedHotel)
    }catch (err){
        next(err)   
    }
}
export const deleteHotel = async (req:Request, res:Response, next:NextFunction) =>{

    try{
       await Hotel.findByIdAndDelete(
            req.params.id
        );
        res.status(200).json("Hotel has deen deleted")
    }catch (err){
        next(err)   
    }
}
export const getHotel = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const hotel = await Hotel.findById(
            req.params.id
            
        );
        if(!hotel) {
      return res.status(404).send("sorry not found!");

        }
        res.status(200).json(hotel)
    }catch (err){
        next(err)   
    }
}
export const getAllHotel = async (req:Request, res:Response, next:NextFunction) =>{

    try{
        const hotels = await Hotel.find();
        res.status(200).json(hotels)
    }catch (err){
            // const error = new HttpError("sorry not found!", 404);
            next(err)   
        }
}