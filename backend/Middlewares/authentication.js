const jwt = require('jsonwebtoken');
const {UnauthenticatedError,UnauthorizedError} = require("../Errors");
const {isTokenValid,attachCookiesToResponse} = require('../utils');
const Token =  require('../Models/token')
const authenticateUser  = async(req,res,next)=>{
  const {accessToken,refreshToken} = req.signedCookies;
  try {
    if(accessToken){
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next()
    }
    const payload = isTokenValid(refreshToken);
    const tokenExist = await Token.findOne({
      user:payload.user.userId,
      refreshToken:payload.refreshToken
    })
    if(!tokenExist||!tokenExist?.isVaild){
      throw new UnauthenticatedError("Authentication invalid")
    }
    attachCookiesToResponse({
      res,
      user:payload.user,
      refreshToken:tokenExist.refreshToken
    })
    req.user = payload.user;
    next();
  } catch (error) {
    console.log(error,'error');
      throw new UnauthenticatedError("Authentication invalid")
  }
}
const authorizePermissions = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new UnauthorizedError(
          'Unauthorized to access this route'
        );
      }
      next();
    };
  };

module.exports = {
    authenticateUser ,
    authorizePermissions
}