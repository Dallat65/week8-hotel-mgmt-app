"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const http_errors_1 = __importDefault(require("http-errors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res, next) => {
    try {
        const saltRounds = 9;
        const salt = await bcrypt_1.default.genSalt(saltRounds);
        const hash = await bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new User_1.default({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(200).send('User has been created.');
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const user = await User_1.default.findOne({ username: req.body.username });
        if (!user)
            return next((0, http_errors_1.default)(404, "User not found"));
        const isPasswordCorrect = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!isPasswordCorrect)
            return next((0, http_errors_1.default)(400, "Wrong password or username"));
        const token = jsonwebtoken_1.default.sign({ id: user._id, isAdmin: user.isAdmin, username: user.username }, process.env.JWT);
        const { password, isAdmin, username, email, _id, createdAt, updatedAt, __v } = user;
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
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
