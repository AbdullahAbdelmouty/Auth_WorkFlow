const {createJWT,attachCookiesToResponse,isTokenValid} = require('./jwt');
const createUserToken = require('./createTokenUser');
const checkPermissions = require('./checkPermissions')
const sendEmail = require('./sendEmail')
const sendVerification = require('./sendVerification')
const sendResetPassword = require('./sendRestEmailPassword')
module.exports = {
    createJWT,
    attachCookiesToResponse,
    isTokenValid,
    createUserToken,
    checkPermissions,
    sendVerification,
    sendResetPassword
}