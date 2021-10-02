const User = require('../models/user');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');

const crypto = require('crypto')
const cloudinary = require('cloudinary');




//user registerations
exports.registerUser = catchAsyncErrors( async (req, res, next) =>{

    const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: 'avatars',
        width:150,
        crop: "scale"
    })

    const {first_name, last_name, gender, birthday, address, phone_no, email, password, role} = req.body;

    const user = await User.create({
        first_name,
        last_name,
        gender,
        birthday,
        address,
        phone_no,
        email,
        password,
        avatar:{
            public_id: result.public_id,
            url: result.secure_url
        }
        //passe roleeka krnna

    })

    sendToken(user, 200, res)

 /*
    const token = user.getJwtToken();

    res.status(201).json({
        success:true,
        token
    })
  */

})


//user login ekta
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const {email, password} = req.body;


//check whether  Email and pwd aare entered in user
if(!email || !password){
    return next(new ErrorHandler('Please enter email & password', 400))
}

//finding the User in the mongodatabase
const user = await User.findOne({ email }).select('+password')


if(!user){
    return next (new ErrorHandler('Invalid Email or Password', 401));

}


//check whether user enterd password is correct or not

const isPasswordMatched = await user.comparePassword(password);

if(!isPasswordMatched){
    return next(new  ErrorHandler('Invalid Email or password', 401));
}

sendToken(user, 200, res)

/*
const token = user.getJwtToken();


res.status(200).json({
    success: true,
    token

})
*/

})


//user forget his password password

exports.forgotPassword = catchAsyncErrors(async(req, res, next ) => {

    const user = await User.findOne({ email: req.body.email });

    if(!user){
        return next(new ErrorHandler('User not found with this email', 404));

    }


    //Geting  the resettoken 
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false });

    //pwd reseting url creating
    //const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;frontendtset ekk nisa meka comment krla yaata ekt adlwa demma  thwa config.env eke line 3 th ayin krnna ona 
    const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    //email eka hrah userta ena msg eka
    const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`

    try{


        await sendEmail({
            email:user.email,
            subject: 'Cupcake & Cakery Password Recovery',
            message
        })

       res.status(200).json({
           success: true,
           message : `Email sent to: ${user.email} `
       }) 



    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false });
        

        return next(new ErrorHandler(error.message, 500))



    }



})


//reseting users pwd
exports.resetPassword = catchAsyncErrors(async(req, res, next ) => {

    //hash url token eka gnnawa 
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex')



        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}//gt mean grater than
        })

        if(!user){
            return next (new ErrorHandler('Password reset token is invalid or has been expired', 400))
        }


        if(req.body.password !== req.body.confirmPassword){
            return next(new ErrorHandler('Password dose not match', 400))
        }

        //creating new pwd for user 
        user.password = req.body.password;

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        sendToken(user, 200, res)

})


//getting curent logEdIn uaser 
exports.getUserProfile = catchAsyncErrors(async(req, res, next) =>{
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })

})


//ProfileUpdate eken button ekk dala  change password eka 
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //Checking  user's old password
    const isMatched = await user.comparePassword(req.body.oldPassword)
    if(!isMatched){
        return next(new ErrorHandler('Old password is incorrect', 400));
    }

    user.password = req.body.password;
    await user.save();

    sendToken(user, 200, res)

})

//update  the userprofile Ub/me
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        phone_no: req.body.phone_no,
        email: req.body.email
        
    }

    //update the user profilepic
    if(req.body.avatar !== ''){
        const user = await User.findById(req.user.id)
        //deleteing
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);
        //upload the new pic
        const result = await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder: 'avatars',
            width:150,
            crop: "scale"
        })
        //save the  new one in the ashse cloud
        newUserData.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true
    })

})



//user logout wenawa  

exports.logout = catchAsyncErrors(async(req, res, next) =>{
    res.cookie('token', null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })

    res.status(200).json({
        success: true,
        message : 'Logged out'
    })

 
})


//in here admin routers 8.4

//Getting the  allusers
exports.allUsers = catchAsyncErrors( async(req, res, next) => {
    const users = await User.find();


    res.status(200).json({
        success: true,
        users
    })
})


//getting a praticuleruser deatils

exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){

        return next(new ErrorHandler(`User dose not found with id: ${req.params.id}`))

    }

    res.status(200).json({
        success: true,
        user
    })




})


//updating user profile admin/update it mean noraml user kenek wa admin krna heti
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        gender: req.body.gender,
        birthday: req.body.birthday,
        address: req.body.address,
        phone_no: req.body.phone_no,
        email: req.body.email,
        role:req.body.role
        
    }

   

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators:true,
        useFindAndModify: false
    })

    res.status(200).json({
        success:true
    })

})


//delete a user in the database  admin krnne meka

exports.deleteUser = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.params.id);

    if(!user){

        return next(new ErrorHandler(`User dose not found with id: ${req.params.id}`))

    }

    //remove the propic in clodanary
   // const image_id = user.avatar.public_id;
   // await cloudinary.v2.uploader.destroy(image_id);




    await user.remove();


    res.status(200).json({
        success: true,
        user
    })




})