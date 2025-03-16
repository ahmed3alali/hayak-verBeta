import dotenv from 'dotenv';
import express from 'express';

import cookieParser from 'cookie-parser';

import cors from "cors";
const app = express();

app.use(cors({
    origin: "http://localhost:3000", // Change this to your actual frontend URL in production
    credentials: true, // Allows cookies and authentication headers
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }));

// Allow only requests from your frontend's domain



import errorMiddleWare from './Middlewares/errors.js';

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log(`ERROR : ${err}`);
    console.log("Shutting down due to uncaught exception");
    process.exit(1);
});

dotenv.config();

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

// Use Routes
app.use("/api/v1/", productRoutes);
app.use("/api/v1/", userRoutes);

// Error Middleware
app.use(errorMiddleWare);

// Connect to database
const server = app.listen(process.env.PORT, () => {
    console.log(`Server working on ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(`ERROR : ${err}`);
    console.log('Shutting down server due to unhandled rejection');
    server.close(() => {
        process.exit(1);
    });
});
