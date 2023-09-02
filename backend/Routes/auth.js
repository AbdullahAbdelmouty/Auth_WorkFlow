const express = require('express');
const router = express.Router();
const { register,verifyEmail, login, logout } = require('../Controllers/auth');
const {authenticateUser} = require('../Middlewares/authentication')

router.post('/register',register);
router.post('/verify-email',verifyEmail)
router.post('/login', login);
router.delete('/logout',authenticateUser,logout);

module.exports = router;