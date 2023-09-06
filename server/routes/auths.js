const express = require('express');
const router = express.Router();

const authsController = require('../controllers/AuthController');

router.get('/', authsController.login)

module.exports = router;