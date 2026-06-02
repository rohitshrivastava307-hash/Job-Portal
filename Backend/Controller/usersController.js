const Users = require("../Models/usersModel")
const asynchandler=require('../Utils/asyncHandler')
const jwt=require('jsonwebtoken')
const util = require('util')
const User = require("../Models/usersModel")
const crypto = require('crypto')
const AppError = require("../Utils/appError")

const signToken=(id)=>{
  return jwt.sign( { id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    })
}


exports.getbyid=asynchandler(async(req,res,next)=>{
   
    const users=await Users.findById(req.params.id)

    if(!users){
        const error = new AppError('User with that ID is not found!', 404);
        return next(error);
    }
    
        res.status(200).json({
            status:'success',
            data:users
        })
    
    }
)




   

exports.registerUser = asynchandler(async (req, res, next) => {

    const user = await Users.create(req.body)

    user.password = undefined

    const token = signToken(user._id)

    res.status(201).json({
        status: 'success',
        token,
        data: user
    })

})



exports.loginUser=asynchandler(async(req,res,next)=>{
 
    const { email, password } = req.body

    if (!email || !password) {
        return next(
            new AppError('Please provide email and password', 400)
        )
    }

    const user = await Users.findOne({ email }).select('+password')

    if (!user || !(await user.compare(password))) {
        return next(
            new AppError('Invalid email or password', 401)
        )
    }

    user.password = undefined

    const token = signToken(user._id)

    res.status(200).json({
        status: 'success',
        token,
        data: user
    })
})


exports.protect = asynchandler(async (req, res, next) => {

    let token

    if (req.headers.authorization &&req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }

    if (!token) {
        return next(
            new AppError('You are not logged in', 401)
        )
    }

    const decoded = await util.promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
    )

    const userexist = await Users.findById(decoded.id)

    if (!userexist) {
        return next(
            new AppError('User no longer exists', 404)
        )
    }

    if (await userexist.ispasswordupdate(decoded.iat)) {
        return next(
            new AppError('Password recently changed. Login again.', 401)
        )
    }

    req.user = userexist

    next()

})


exports.restrict=(role)=>{
    
    return(req,res,next)=>{
    if(req.user.role!==role){
           const error = new AppError('No User Exist', 403);
        return next(error);
    }

next();
}

}



exports.updateUserPassword = asynchandler(async (req, res, next) => {

    const user = await Users.findById(req.user._id)
        .select('+password')

    const correct = await user.compare(req.body.password)

    if (!correct) {
        return next(
            new AppError('Current password is wrong', 401)
        )
    }

    user.password = req.body.newPassword
    user.confirmPassword = req.body.confirmPassword

    await user.save()

    res.status(200).json({
        status: 'success',
        message: 'Password updated successfully'
    })

})


exports.forgotPassword = asynchandler(async (req, res, next) => {

    const user = await Users.findOne({
        email: req.body.email
    })

    if (!user) {
        return next(
            new AppError('No user with this email', 404)
        )
    }

    const token = user.passwordReset()

    await user.save({ validateBeforeSave: false })

    res.status(200).json({
        status: 'success',
        token
    })

})







exports.resetPassword = asynchandler(async (req, res, next) => {

    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex')

    const user = await Users.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    })

    if (!user) {
        return next(
            new AppError('Token is invalid or expired', 400)
        )
    }

    user.password = req.body.password
    user.confirmPassword = req.body.confirmPassword

    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    res.status(200).json({
        status: 'success',
        message: 'Password reset successful'
    })

})