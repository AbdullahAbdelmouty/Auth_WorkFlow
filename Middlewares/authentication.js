const jwt = require('jsonwebtoken');
const {UnauthenticatedError,UnauthorizedError} = require("../Errors");
const {isTokenValid} = require('../utils')
const authenticateUser  = async(req,res,next)=>{
  const token = req.signedCookies.token
  if(!token){
  throw new UnauthenticatedError("Authentication invalid")
  }
  try {
    const { name, userId, role } = isTokenValid({ token });
    req.user = { name, userId, role };
    next();
  } catch (error) {
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