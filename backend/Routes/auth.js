const express = require('express');
const router = express.Router();
const { register,verifyEmail, login, logout,forgotPassword,resetPassword } = require('../Controllers/auth');
const {authenticateUser} = require('../Middlewares/authentication')

router.post('/register',register);
router.post('/verify-email',verifyEmail)
router.post('/login', login);
router.delete('/logout',authenticateUser,logout);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password',resetPassword)

module.exports = router;