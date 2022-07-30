const {promisify} = require('util')
const contentNegotiation = require("../utils/contentNegotiation")
const jwt = require('jsonwebtoken')

exports.isSignedIn = async(req, res,next) => {
    try {
      const token = req.cookies.jwt;
      if (typeof token === "undefined" || token === '') {
        // console.log("hello")
        next()
      }
      else {
      const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
      if (decoder.username !== "undefined") return contentNegotiation.sendErrorResponse(403,"Sign Out First And Then Try Again!",req,res,null);
      next()
      }
    } 
    catch (error) {
      return contentNegotiation.sendErrorResponse(404,error.message,req,res,null);
    }
};
exports.notSignedIn = async(req, res,next) => {
    try {
       const token = req.cookies.jwt;
       if (typeof token === "undefined" || token === '') {
           return contentNegotiation.sendErrorResponse(403,"Sign in First And Then Try Again!",req,res,null);
       }
       else {
       const decoder = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
       if (decoder.username === "undefined") return contentNegotiation.sendErrorResponse(403,"Sign in First And Then Try Again!",req,res,null);
       next()
       }
    } 
    catch (error) {
      return contentNegotiation.sendErrorResponse(404,error.message,req,res,null);
    }
};

