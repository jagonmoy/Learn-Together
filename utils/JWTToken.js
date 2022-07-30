const jwt = require('jsonwebtoken')

exports.sendJWTToken = (username) => {
    const token =  jwt.sign({username : username},process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRE
    })
    let cookieOptions;
    console.log(process.env.NODE_ENV)
    if (process.env.NODE_ENV === "test") {
      cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httponly: true,
      };
    } 
    else if ( process.env.NODE_ENV === 'production') {
      cookieOptions = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        secure: true,
        sameSite: "None",
      };
    }
    
    return {cookieOptions,token};
}

exports.clearToken = () => {
  let cookieOptions;
  if (process.env.NODE_ENV === "test") {
    cookieOptions = {
      expires: new Date(Date.now() + 1* 1000),
      httponly: true,
    };
  } 
  else if ( process.env.NODE_ENV === 'production') {
    cookieOptions = {
      expires: new Date(Date.now() + 1* 1000),
      secure: true,
      sameSite: "None",
    };
  }
  return cookieOptions;
}