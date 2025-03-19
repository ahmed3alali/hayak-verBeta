import dotenv from 'dotenv';
import express from 'express';

import cookieParser from 'cookie-parser';
import path from "path";
import errorMiddleWare from './Middlewares/errors.js';
import cors from 'cors';
const app = express();
const allowedOrigins = process.env.CLIENT_URLS.split(",");

const corsConfig = {
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig));







// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR : ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});


if (process.env.NODE_ENV!=='PRODUCTION') {
    dotenv.config();
    
}


const MongoUrl = process.env.DB_LOCAL_URI;
mongoose.connect(MongoUrl).then(()=>{

    console.log("connected to db !");
}).catch((error)=>{

console.log(error);

})







app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());


// Import Routes
import productRoutes from "./Routes/product.js";
import userRoutes from "./Routes/auth.js";
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';

// Use Routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoutes);




// Error Middleware
app.use(errorMiddleWare);

// Connect to database
const server = app.listen(process.env.PORT, () => {
    console.log(`Server working on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

app.get("/", (req, res) => {
    res.send("Hello World");
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR : ${err}`);
    console.log('Shutting down server due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    });
});
