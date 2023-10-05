const express = require('express');
const router = express.Router();
const authsController = require('../controllers/AuthController');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/login', authsController.login);
router.post('/register', authsController.register);
router.get('/final-register/:registerToken', authsController.finalRegister);
router.get('/current', verifyAccessToken, authsController.getCurrentUser);
router.post('/refreshtoken', authsController.refreshAccessToken);
router.get('/logout', authsController.logout);
router.post('/forgotpassword', authsController.forgotPassword);
router.put('/resetpassword', authsController.resetPassword);

module.exports = router;