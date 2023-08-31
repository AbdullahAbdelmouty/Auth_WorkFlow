const nodemailer = require('nodemailer')
const nodemailerConfig = require('./nodemailerConfig')
const sendEmail = async({to,subject,html})=>{
    const transporter = nodemailer.createTransport(nodemailerConfig);
    const info = await transporter.sendMail({
        from: '"Test" <foo@example.com>', // sender address
        to,
        subject,
        html
      });
}

module.exports = sendEmail;