import express from 'express';
import {updateUser, deleteUser, getUser, getAllUsers } from "../controllers/usercontroller"
import { verifyToken, verifyUser } from '../utils/verifyToken';
import {JwtPayload} from "jsonwebtoken";

import User from '../models/User';
const router = express.Router();



router.get("/checkauthentication", verifyToken, (req:JwtPayload, res, next) =>{
    res.send(`hello ${req.user.username}, you are logged in`)
})

router.get("/checkuser/:id", verifyToken, verifyUser, (req:JwtPayload, res, next) =>{
    res.send(`hello ${req.user.username}, you are logged in and you can delete your account`)
})

router.patch('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id', getUser)
router.get('/', getAllUsers)

export default router