const express = require('express');
const authController = require('../controllers/authController');
const userValidator = require("../validations/userValidator");
const authMiddleware = require("../middlewares/authMiddleware")
const authRouter = express.Router();
 
 
authRouter.post('/signup',authMiddleware.isSignedIn,userValidator.signupUserValidation(),userValidator.validate,authController.signup);
authRouter.post('/signin',authMiddleware.isSignedIn,userValidator.signinUserValidation(),userValidator.validate,authController.signin);
authRouter.post('/signout',authMiddleware.notSignedIn,authController.signout);

module.exports = authRouter;