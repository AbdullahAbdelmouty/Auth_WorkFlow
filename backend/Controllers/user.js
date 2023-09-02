const User = require('../Models/user');

const showMe = async(req,res)=>{
    console.log(req.user,'req.user');
    res.status(200).json({user:req.user})
}

module.exports = {showMe}
