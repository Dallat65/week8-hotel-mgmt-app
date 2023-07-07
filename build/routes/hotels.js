"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const hotelcontroller_1 = require("../controllers/hotelcontroller");
//=============CREATE===================
router.post('/', hotelcontroller_1.CreateHotel);
//=============UPDATE===================
router.patch('/:id', hotelcontroller_1.updateHotel);
//=============DELETE===================
router.delete('/:id', hotelcontroller_1.deleteHotel);
//===============GET===================
router.get('/:id', hotelcontroller_1.getHotel);
//=============GETALL===================
router.get('/', hotelcontroller_1.getAllHotel);
// const failed =true;
// err.status =404;
// err.message = "sorry not found!";
// if (failed) return next(err);
exports.default = router;
