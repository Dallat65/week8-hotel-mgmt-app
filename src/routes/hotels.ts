import express from 'express';
import Hotel from "../models/Hotel"
const router = express.Router();
import HttpError from '../utils/httpError';
import { CreateHotel, updateHotel,
    deleteHotel, getHotel, getAllHotel } from '../controllers/hotelcontroller';

//=============CREATE===================
router.post('/', CreateHotel)
//=============UPDATE===================
router.patch('/:id', updateHotel)

    
//=============DELETE===================
router.delete('/:id', deleteHotel)
//===============GET===================
router.get('/:id', getHotel)
//=============GETALL===================
router.get('/', getAllHotel)
// const failed =true;
// err.status =404;
// err.message = "sorry not found!";
// if (failed) return next(err);



export default router;