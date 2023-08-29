const User = require('../Models/user')
const CustomError = require('../Errors')
const {BadRequestError,UnAuthenticatedError} = require('../Errors')
const crypto = require('crypto')
const {createUserToken,attachCookiesToResponse} = require('../utils')
const register = async (req, res) => {
    const { email, name, password } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
    throw new BadRequestError('Email already exists');
    }
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const verificationToken = crypto.randomBytes(40).toString('hex') // random string
    const user = await User.create({ name, email, password, role,verificationToken });
    res.status(201).json({msg:"Please go to your email to verifiy the account"})
};

const verifyEmail = async(req,res)=>{
  const {verificationToken,email} = req.body;
  const user = await User.findOne({email});
  if(!user){
    throw new UnAuthenticatedError('Email not exist')
  }
  if(!user.verificationToken===verificationToken){
    throw new UnAuthenticatedError('verification faild')
  }
  user.isVerified= true;
  user.verificationToken = '';
  user.save();
  res.send("email verified")
}
const login = async(req,res)=>{
  const {email,password} = req.body;
  if(!email||!password){
    throw BadRequestError('please provide email and password')
  }
  
  const user = await User.findOne({email})
  if(!user){
    throw new UnAuthenticatedError('Invaild Credentials')
  }
  console.log('before');
  const isPasswordCorrect = await user.comparePassword(password)
  console.log('after');
  if(!isPasswordCorrect){
    throw new UnAuthenticatedError('Invaild Credentials')
  }
  // console.log(isPasswordCorrect);
  if(!user.isVerified){
    throw new UnAuthenticatedError('Please verifiy email')
  }
  const tokenUser = createUserToken(user)
  attachCookiesToResponse({res,user:tokenUser})
  res.status(201).json({user:tokenUser});
}
const logout = async(req,res)=>{
  res.send("Dd")
}
  
  module.exports = {
    register,
    verifyEmail,
    login,
    logout
  };