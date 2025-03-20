import users from "../Models/users.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import catchAsyncErrors from "./catchAsyncErrors.js";
import jwt from "jsonwebtoken";

export const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;
    console.log("Cookies received:", req.cookies); // Debugging line
    if (!token) {
        return next(new ErrorHandler("Login first to access this resource", 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await users.findById(decoded.id);

        if (!req.user) {
            return next(new ErrorHandler("User not found", 404));
        }

        next(); // Move to the next middleware
    } catch (error) {
        return next(new ErrorHandler("Invalid or expired token", 401));
    }
});




//authorize user roles

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(new ErrorHandler(`Role ${req.user?.role || "Admin"} is not allowed to access this resource`, 403));
      }
      
      next(); // Proceed to the next middleware if the role is authorized
    };
  };




