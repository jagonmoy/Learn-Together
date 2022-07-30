const contentNegotiation = require("../utils/contentNegotiation")
const authService = require("../services/authService")
const JWTToken = require("../utils/JWTToken")
const email = require("../utils/email")

exports.signup = async (req, res) => {
 try {
   const newUser = await authService.signupUser(req);
   if(typeof newUser === "string") return contentNegotiation.sendErrorResponse(403,newUser,req,res);
   else {
     email.sendWelcomeEmail(req);
     return contentNegotiation.sendResponse(200,newUser,req,res);
   }
 } 
 catch (error) {
   return contentNegotiation.sendErrorResponse(403,error.message,req,res);
 }
};

exports.signin = async (req, res) => {
  try {
    const user = await authService.signinUser(req);
    if (typeof user === "string") return contentNegotiation.sendErrorResponse(401,user,req,res);

    const {token,cookieOptions} = JWTToken.sendJWTToken(user.username)

    res.cookie("jwt",token,cookieOptions);
    return contentNegotiation.sendResponse(200,user.username,req,res);
  } catch (error) {
    return contentNegotiation.sendErrorResponse(401,error.message,req,res);
  }
 };
 exports.signout = async (req, res) => {     
  const cookieOptions  = JWTToken.clearToken();
  res.cookie("jwt",'',cookieOptions)
  return contentNegotiation.sendResponse(200,"Signed Out Successfully!",req,res);
 };