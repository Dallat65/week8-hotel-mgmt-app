import express,{urlencoded, Request, Response, NextFunction} from "express";
import dotenv from "dotenv";
import mongoose,{ConnectOptions} from "mongoose";
import logger from "morgan";
import cookieparser from "cookie-parser";
import authRoute from "./routes/auth";
import usersRoute from "./routes/users";
import hotelsRoute from "./routes/hotels";
import roomsRoute from "./routes/rooms";
import {HttpError} from "http-errors";
import cookieParser from "cookie-parser";


const app = express();
dotenv.config();


app.use(logger('dev'));
app.use(express.json());
app.use(urlencoded({extended:false}));
app.use(cookieparser());

const connect = async () =>{
    try {
        await mongoose.connect(`${process.env.MONGO}`, {
            useNewUrlParser: true,
            useUnifiedTopology : true
        }as ConnectOptions);
        console.log(`connected to mongoDB.`);
    } catch (error) {
        throw error;
    }
};
    
mongoose.connection.on('disconnected', () =>{
    console.log('mongoDB disconnected!');  
})

mongoose.connection.on('connected', () =>{
    console.log('mongoDB connected!');  
})

app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err:HttpError, req:Request, res:Response, next:NextFunction) =>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });    
});

const port = process.env.PORT
app.listen(port, () =>{
    connect()
    console.log(`server started on port ${port}`);
})

export default app;