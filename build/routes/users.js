"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers/usercontroller");
const verifyToken_1 = require("../utils/verifyToken");
const router = express_1.default.Router();
router.get("/checkauthentication", verifyToken_1.verifyToken, (req, res, next) => {
    res.send(`hello ${req.user.username}, you are logged in`);
});
router.get("/checkuser/:id", verifyToken_1.verifyToken, verifyToken_1.verifyUser, (req, res, next) => {
    res.send(`hello ${req.user.username}, you are logged in and you can delete your account`);
});
router.patch('/:id', usercontroller_1.updateUser);
router.delete('/:id', usercontroller_1.deleteUser);
router.get('/:id', usercontroller_1.getUser);
router.get('/', usercontroller_1.getAllUsers);
exports.default = router;
