import ErrorHandler from "../utils/ErrorHandler.js";

export default (err, req, res, next) => {
    let error = {
        statusCode: err?.statusCode || 500,
        message: err?.message || "Internal Server Error",
    };

    // Prevent sending multiple responses
    if (res.headersSent) {
        return next(err);
    }

    // Handle invalid mongoose ID error
    if (err.name === "CastError") {
        const message = "Resource not found. Invalid ID";
        error = new ErrorHandler(message, 404);
    }


// Mongo db dublicate error 

    if (err.name === 1000) {
        const message = "Dublicate Key error please check your database for dublicates";
        error = new ErrorHandler(message, 400);
    }



// hadle wrong jwt error 



if (err.name === "JsonWebTokenError") {
    const message = "Json web token is invalid.";
    error = new ErrorHandler(message, 400);
}



// Handle expired token 

if (err.name === "TokenExpiredError") {
    const message = "Json web token is expired.";
    error = new ErrorHandler(message, 400);
}



    // Handle validation error
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((values) => values.message);
        error = new ErrorHandler(message, 400);
    }

    // Send the response
    res.status(error.statusCode).json(
        process.env.NODE_ENV === "DEVELOPMENT"
            ? { message: error.message, error: err, stack: err?.stack }
            : { message: error.message }
    );
};
