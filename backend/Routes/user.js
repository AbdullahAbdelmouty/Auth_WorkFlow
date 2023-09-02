const express = require('express');
const { authenticateUser } = require('../Middlewares/authentication');
const { showMe } = require('../Controllers/user');

const Route = express.Router();

Route.get('/showMe',authenticateUser,showMe);

module.exports = Route;