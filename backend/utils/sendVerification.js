const sendEmail = require("./sendEmail")

const sendVerification = async({name,email,verificationToken,origin})=>{
    const verifiyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`
    const message = `<p>Pleae click on the following link to verifiy your email link :<a href=${verifiyEmail}>verifiy email</a></p>`
    return sendEmail({to:email,subject:"verification email",html:`<h4>Hello ${name}</h4>${message}`})
}

module.exports = sendVerification