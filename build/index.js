"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const users_1 = __importDefault(require("./routes/users"));
const hotels_1 = __importDefault(require("./routes/hotels"));
const rooms_1 = __importDefault(require("./routes/rooms"));
const cookie_parser_2 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, cookie_parser_1.default)());
const connect = async () => {
    try {
        await mongoose_1.default.connect(`${process.env.MONGO}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`connected to mongoDB.`);
    }
    catch (error) {
        throw error;
    }
};
mongoose_1.default.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!');
});
mongoose_1.default.connection.on('connected', () => {
    console.log('mongoDB connected!');
});
app.use((0, cookie_parser_2.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.use('/api/hotels', hotels_1.default);
app.use('/api/rooms', rooms_1.default);
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});
const port = process.env.PORT;
app.listen(port, () => {
    connect();
    console.log(`server started on port ${port}`);
});
exports.default = app;
