import express from 'express';
import dotenv from "dotenv";

import cookieParser from 'cookie-parser';

import authRoutes from "./routes/auth.route.js";

import { connectDB } from './db/db.js';

dotenv.config();

const app = express();  // create express app
// const PORT = 3000; 

// console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;
app.use(express.json());  // pang test dyay postman
app.use(cookieParser());
app.use("/api/auth", authRoutes)




app.listen(PORT, () => {
    console.log(`server started running on http://localhost:${PORT}`);
    connectDB();
});


