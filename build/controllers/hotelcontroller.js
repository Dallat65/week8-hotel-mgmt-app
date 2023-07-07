"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHotel = exports.getHotel = exports.deleteHotel = exports.updateHotel = exports.CreateHotel = void 0;
const Hotel_1 = __importDefault(require("../models/Hotel"));
const CreateHotel = async (req, res, next) => {
    const newHotel = await new Hotel_1.default(req.body);
    try {
        const savedHotel = await newHotel.save();
        return res.status(200).json(savedHotel);
    }
    catch (err) {
        next(err);
    }
};
exports.CreateHotel = CreateHotel;
const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedHotel);
    }
    catch (err) {
        next(err);
    }
};
exports.updateHotel = updateHotel;
const deleteHotel = async (req, res, next) => {
    try {
        await Hotel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has deen deleted");
    }
    catch (err) {
        next(err);
    }
};
exports.deleteHotel = deleteHotel;
const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel_1.default.findById(req.params.id);
        if (!hotel) {
            return res.status(404).send("sorry not found!");
        }
        res.status(200).json(hotel);
    }
    catch (err) {
        next(err);
    }
};
exports.getHotel = getHotel;
const getAllHotel = async (req, res, next) => {
    try {
        const hotels = await Hotel_1.default.find();
        res.status(200).json(hotels);
    }
    catch (err) {
        // const error = new HttpError("sorry not found!", 404);
        next(err);
    }
};
exports.getAllHotel = getAllHotel;
