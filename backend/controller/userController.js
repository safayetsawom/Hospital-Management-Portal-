import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

export const patientRegister = catchAsyncErrors(async(req,resizeBy,next)=>{
    const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nid,
    role,
    } = req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone ||
        !password ||
        !gender ||
        !dob ||
        !nid ||
        !role
    ){
        return next(new ErrorHandler("Please Full Full Form!", 400));
    }
    let user = await User.findOne({ email });
    if(user){
        return next(new ErrorHandler("User Already Registered!", 400));
    }
    user = await User.create({
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nid,
        role,
    });
    res.status(200).json({
        success: true,
        message: "User Registered!"
    })
});
