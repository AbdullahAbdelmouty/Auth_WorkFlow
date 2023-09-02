const sendEmail = require('../utils/sendEmail');

const sendResetPassword = async({name,email,token,origin})=>{
    const link = `${origin}/user/reset-password/?token=${token}&email=${email}`
    const message = `<p>Please click on the following link to reset password:<a href=${origin}>Reset Password</a></p>`
    return sendEmail({to:email,subject:"Reset Password",html:`<h4>Hello ${name}</h4>${message}`})
}

module.exports = sendResetPassword;