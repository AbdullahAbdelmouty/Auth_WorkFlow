const User = require('../Models/user')
const Token = require('../Models/token')
const CustomError = require('../Errors')
const {BadRequestError,UnAuthenticatedError} = require('../Errors')
const crypto = require('crypto')
const {createUserToken,attachCookiesToResponse,sendVerification} = require('../utils')
const user = require('../Models/user')
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
    const origin = 'http://localhost:3000'
    await sendVerification({name:user.name,email:user.email,verificationToken,origin})
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
  const isPasswordCorrect = await user.comparePassword(password)
  if(!isPasswordCorrect){
    console.log('pass');
    throw new UnAuthenticatedError('Invaild Credentials ')
  }
  // console.log(isPasswordCorrect);
  if(!user.isVerified){
    throw new UnAuthenticatedError('Please verifiy email')
  }
  const tokenUser = createUserToken(user);
  // create refresh token
  let refreshToken = '';
  //check if token exist
  const TokenExist = await  Token.findOne({user:user._id})
  console.log(TokenExist,'TokenExist');
  if(TokenExist){
    refreshToken = TokenExist.refreshToken
    console.log(TokenExist.isVaild);
    if(!TokenExist.isVaild){
      console.log('token');
      throw new UnAuthenticatedError('Invaild Credentials')
    }
    attachCookiesToResponse({res,user:tokenUser,refreshToken})
    res.status(201).json({user:tokenUser});
    return;
  }
  refreshToken = crypto.randomBytes(40).toString('hex');
  const ip = req.ip;
  const userAgent = req.headers['user-agent'];
  const userToken = {refreshToken,userAgent,ip,user:user._id};
  await Token.create(userToken);
  attachCookiesToResponse({res,user:tokenUser,refreshToken})
  res.status(201).json({user:tokenUser});
}
const logout = async(req,res)=>{
  // delete token from db
  await Token.findOneAndDelete({user:req.user.userId});
  // delelte accessToken from cookies
  res.cookie('accessToken',{
    httpOnly:true,
    expires: new Date(Date.now())
  });
  // delete refreshToken from cookies
  res.cookie('refreshToken',{
    httpOnly:true,
    expires: new Date(Date.now())
  });

  res.status(200).json({msg:'user logged out!'})
}
  
  module.exports = {
    register,
    verifyEmail,
    login,
    logout
  };