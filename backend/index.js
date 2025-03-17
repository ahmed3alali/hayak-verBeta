import dotenv from 'dotenv';
import express from 'express';

import cookieParser from 'cookie-parser';
import path from "path";
import errorMiddleWare from './Middlewares/errors.js';
const app = express();



  




// import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




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


if (process.env.NODE_ENV==="PRODUCTION") {

    app.use(express.static(path.join(__dirname,"../frontend/build")));
    app.get('*',(req,res)=>{

res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));

    })
    
}

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
