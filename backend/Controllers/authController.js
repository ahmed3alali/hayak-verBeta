import catchAsyncErrors from "../Middlewares/catchAsyncErrors.js";
import users from "../Models/users.js";


import Users from "../Models/users.js";
import { delete_file, upload_file } from "../utils/cloudinary.js"
import { getResetPasswordTemplete } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto"


export const registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if email is already registered
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    // Check if password is at least 6 characters long
    if (!password || password.length < 6) {
        return next(new ErrorHandler("Password must be at least 6 characters long", 400));
    }

    const user = await Users.create({ name, email, password });

    sendToken(user, 201, res);
});



export const loginUser = catchAsyncErrors(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email and password', 400))
    }



    // find user in database... 


    const user = await Users.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler('Invalid email or password ', 400))
    }


    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid email or password'), 401)
    }


    sendToken(user, 200, res)

});





export const logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {


        expires: new Date(Date.now()),
        httpOnly: true

    })

    res.status(200).json({

        message: "loggout out!"


    })



});





export const uploadAvatar = catchAsyncErrors(async (req, res, next) => {

const avatarResponse = await upload_file(req.body.avatar,"taswoqi/avatars");


if (req?.user?.avatar?.url) {
    await delete_file(req?.user?.avatar?.public_id)
}


const user = await Users.findByIdAndUpdate(req?.user?._id,{


    avatar:avatarResponse,
});

    res.status(200).json({

        user,


    })



});




//forgot password => .../api/v1/password/forgot
//  
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {

    
        console.log("Received email:", req.body.email)


    // find user in database... 


    const user = await Users.findOne({ email: req.body.email })
    if (!user) {
    
        return next(new ErrorHandler('No user found with this email ', 404))
    }

    //get reset password token
    const resetToken = user.getResetPasswordToken()
    await user.save()

    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;


    const message = getResetPasswordTemplete(user?.name, resetUrl);


    try {

        await sendEmail({

            email: user.email,
            subject: 'Taswoqi Password Recovery',
            message,


        });
        res.status(200).json({

            message: `Email sent to ${user.email}`,

        });



    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();
        return next(new ErrorHandler(error?.message, 500));
    }



});



export const resetPassword = catchAsyncErrors(async (req, res, next) => {


    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await Users.findOne({

        resetPasswordToken,
        resetPasswordExpire: {

            $gt: Date.now()

        },

    });


    if (!user) {


        return next(

            new ErrorHandler("Password reset token is invalid or has been expired!", 400)

        );

    }


    if (req.body.password != req.body.confirmPassword) {

        return next(new ErrorHandler("Passwords don't match", 400));

    }


    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();


    sendToken(user, 200, res);

});


// get current user's info 


export const getUserProfile = catchAsyncErrors(async (req, res, next) => {


    const user = await users.findById(req?.user?._id);

    res.status(200).json({

        user,

    });


}


);


// update password 



export const updatePassword = catchAsyncErrors(async (req, res, next) => {


    const user = await users.findById(req?.user?._id).select("+password");

    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    if (!isPasswordMatched) {

        return next(new ErrorHandler("Old password is incorrect", 400));
    }


    user.password = req.body.password;
    user.save();



    res.status(200).json({

        success: true,

    });


}


);

export const updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    const user = await users.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,        // Return updated user
        runValidators: true, // Validate new data
    });

    if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
        success: true,
        user, // Return updated user
    });
});



// get all users - admin ===> /api/v1/admin/users


export const allUsers = catchAsyncErrors(async (req, res, next) => {


    const theUsers = await users.find();


    res.status(200).json({

        theUsers,


    });


});



export const getUserDetails = catchAsyncErrors(async (req, res, next) => {


    const user = users.findById(req.params.id);




    if (!user) {


        next(new ErrorHandler("user not found with id requested", 404))

    }

    res.status(200).json({

        user,

    });


});



//update user details (ONLY ADMIN) 


export const updateUser = catchAsyncErrors(async (req, res, next) => {


    const newUserData = {

        name: req.body.name,
        email: req.body.email,
        role: req.body.role,


    };

    const user = await users.findByIdAndUpdate(req.params.id, newUserData, {

        new: true,

    });


    res.status(200).json({

        user,

    });
});

// delete (ADMIN ONLY)

export const deleteUser = catchAsyncErrors(async (req, res, next) => {


    const user = users.findById(req.params.id);




    if (!user) {


        next(new ErrorHandler("user not found with id requested", 404))

    }


    await user.deleteOne()



    //todo - remove also the avatar of the user when front end dev is done 

    res.status(200).json({

        sucess: true,

    });


});




