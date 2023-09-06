const User = require('../models/User');
const LoginAccount = require('../models/LoginAccount');
const Role = require('../models/Role');

class AuthController {
    login(req, res, next) {
        res.send("Welcome to the")
    }

}

module.exports = new AuthController();