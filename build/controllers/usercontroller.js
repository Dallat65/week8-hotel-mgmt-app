"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getUser = exports.deleteUser = exports.updateUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const updateUser = async (req, res, next) => {
    try {
        const updatedUser = await User_1.default.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        await User_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Users has deen deleted");
    }
    catch (err) {
        next(err);
    }
};
exports.deleteUser = deleteUser;
const getUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).send("sorry not found!");
        }
        res.status(200).json(User_1.default);
    }
    catch (err) {
        next(err);
    }
};
exports.getUser = getUser;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find();
        res.status(200).json(users);
    }
    catch (err) {
        // const error = new HttpError("sorry not found!", 404);
        next(err);
    }
};
exports.getAllUsers = getAllUsers;
