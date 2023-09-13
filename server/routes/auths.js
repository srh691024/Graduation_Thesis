const express = require('express');
const router = express.Router();

const authsController = require('../controllers/AuthController');

router.post('/login', authsController.login);
router.post('/register', authsController.register);


module.exports = router;