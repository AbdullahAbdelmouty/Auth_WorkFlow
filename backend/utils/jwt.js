const jwt = require('jsonwebtoken')

// create jwt token method
// will use jwt.sign to create token to use function when login and register controllers run
// jwt.sign(payload,secert,options) takes three parameters 
//1- what object contain what you need to return to frontend
//2- secert key 
//3-object contain some of properties about token such as expires date
const createJWT = ({payload})=>{
    const token = jwt.sign(payload,process.env.JWT_SECERT,{expiresIn:process.env.TOKEN_LIFETIME});
    return token
}
// cookies
const attachCookiesToResponse = ({res,user,refreshToken})=>{
    const accessTokenJWT = createJWT({payload:{user}});
    const refreshTokenJWT = createJWT({payload:{user,refreshToken}})
    const oneDay = 1000*60*60*24;
    const oneMonth = 1000*60*60*24;
    res.cookie('accessToken',
    accessTokenJWT,
    {httpOnly: true,
    secure: process.env.NODE_ENV === 'production', //
    signed: true, // 
    expires:new Date(Date.now() + oneDay),
    })
    res.cookie('refreshToken',
    refreshTokenJWT,
    {httpOnly: true,
    expires:new Date(Date.now() + oneMonth),
    secure: process.env.NODE_ENV === 'production', //
    signed: true, // 
    })
}

// const attachSingleCookeToResponse = ({res,user})=>{
//     const token = createJWT({payload:user})
//     const oneDay = 1000*60*60*24
//     res.cookie('token',
//     token,
//     {httpOnly: true,
//     expires:new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV, //
//     signed: true, // 
//     })
// }

const isTokenValid = (token ) => jwt.verify(token, process.env.JWT_SECERT);

module.exports = {
    createJWT,
    isTokenValid,
    attachCookiesToResponse
}