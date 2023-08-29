const User = require('../Models/user')
const CustomError = require('../Errors')
const register = async (req, res) => {
    const { email, name, password } = req.body;
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
    throw new CustomError.BadRequestError('Email already exists');
    }
    // first registered user is an admin
    const isFirstAccount = (await User.countDocuments({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';
    const verificationToken = 'fake token'
    const user = await User.create({ name, email, password, role,verificationToken });
    res.status(201).json({msg:"Please go to your email to verifiy the account"})
};
const login = async(req,res)=>{
  const {email,password} = req.body;
  if(!email||!password){
    throw new CustomError.BadRequestError('Please provide email and password')
  }
  const user = User.findOne({email})
  if(!email){
    throw new CustomError.UnAuthenticatedError('Email not exist please try again')
  }
  const isPassowrdCorrect = user.comparePassword(password)
  if(!isPassowrdCorrect){
    throw new CustomError.UnAuthenticatedError('Passowrd not exist please try again')
  }
  if(!user.isVerifiedToken){
    throw new CustomError.UnAuthorizedError("Please verify email")
  }
}

const logout = async(req,res)=>{
  res.send("Dd")
}
  
  module.exports = {
    register,
    login,
    logout
  };