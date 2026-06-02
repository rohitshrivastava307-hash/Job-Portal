const express=require('express')
const usersController=require('../Controller/usersController')
const router=express.Router()

router.route('/register').post(usersController.registerUser)
router.route('/forgotpassword').post(usersController.forgotPassword)

router.route('/resetpassword/:token').patch(usersController.resetPassword)
router.route('/login').post(usersController.loginUser)
router.route('/updatepassword').patch(usersController.protect,usersController.updateUserPassword)
router.route('/:id') .get(usersController.protect,usersController.restrict('recruiter'), usersController.getbyid)
module.exports = router