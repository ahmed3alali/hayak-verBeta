

import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import crypto from 'crypto'
const userSchema = new mongoose.Schema({


    name: {

        type: String,
        required: [true, "Please enter a your name"],
        maxLenght: [50, "Name name cannot exceed 50 characters"]
    },


    email: {

        type: String,
        required: [true, "Please enter your email"],
        unique: true,

    },
    password: {

        type: String,
        required: [true, "Please enter a your password"],
        maxLenght: [6, "Password must be longer than 6 characters !"],
        select: false
    },
    avatar: {
 
        public_id: String, 
        url: String,
       
    },

    role: {

type: String,
default: "user",


    },
    resetPasswordToken : String,
    resetPasswordExpire: Date,



},{timestamps:true});




userSchema.pre("save",async function (next){

if (!this.isModified("password")) {
    next();
    
}
this.password = await bcrypt.hash(this.password,10)
});




// return JWT token 


userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
};



userSchema.methods.comparePassword = async function(enteredPassword) {

return await bcrypt.compare(enteredPassword,this.password)


};


//generate password reset token


userSchema.methods.getResetPasswordToken= function (){

//generate token

const resetToken = crypto.randomBytes(20).toString('hex');
    //hash and  set to reset password field,

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")



// set token expire time 


this.resetPasswordExpire = Date.now()+ 30 * 60 * 1000
return resetToken;


};


export default mongoose.model("Users",userSchema);