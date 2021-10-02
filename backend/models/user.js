const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')


const userSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required: [true, 'Please enter your first name'],
        maxLength: [30, 'Your first name cannot exceed 30 characters']
    },
    last_name:{
        type: String,
        required: [true, 'Please enter your last name'],
        maxLength: [30, 'Your last name cannot exceed 30 characters']
    },
    gender:{
        type: String,
        required: [true, 'Please enter male female'],
        default: 'male'
    },
    birthday:{
        type: String,
        required: [true, 'Please enter your birthday']
    },
    address:{
        type: String,
        required: [true, 'Please enter your address']
    },
    phone_no:{
        type: String,
        unique:true,
        required: [true, 'Please enter your phoneNo'],
        maxLength: [10, ' Invalid Phone Number'],
        minlength:[10, 'Invalid Phone Number'],
    },
    email:{
        type:String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']   
    },
    password:{
        type: String,
        required:[true, 'Please enter your password'],
        minlength:[6, 'Your password must be longer than 6 characters'],
        select:false
    },
    avatar: {
        public_id:{
            type:String,
            required: true
        },
        url: {
            type:String,
            required: true
        }
    },


    //admin wenuwen dapu eka
    role :{
        type: String,
        default: 'user'
    },
    //iwary
    createdAt: {
        type: Date,
        default: Date.now
    },
    //report ekt ona wewi kiyladine dnwa me dkwa weda kra patn gttha


    //iwr una


    resetPasswordToken:String,
    resetPasswordExpire:Date

})


//Encrypte user pwd before the save
userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})



//comparing the users pwd
userSchema.methods.comparePassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
} 


//Rturn JWTToken
userSchema.methods.getJwtToken = function (){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}


//genarating the pwd reset token 

userSchema.methods.getResetPasswordToken = function() {
    //generating  token
    const resetToken = crypto.randomBytes(20).toString('hex');

    //Hash N set to resetPAsswordtoken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    //setting the token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

    return resetToken



}




module.exports = mongoose.model('User', userSchema);