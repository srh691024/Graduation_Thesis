const express = require('express');
const router = express.Router();
const authsController = require('../controllers/AuthController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/login', authsController.login);
router.post('/register', authsController.register);
router.get('/final-register/:registerToken', authsController.finalRegister);
router.get('/current', verifyAccessToken, authsController.getCurrentUser);
router.post('/refreshtoken', authsController.refreshAccessToken);
router.get('/logout', authsController.logout);
router.post('/forgotpassword', authsController.forgotPassword);
router.put('/resetpassword', authsController.resetPassword);
router.get('/getAllUsers', [verifyAccessToken, isAdmin], authsController.getAllUsers);
router.delete('/deleteUser', verifyAccessToken, authsController.deleteUser);
router.put('/updateUser', verifyAccessToken, authsController.updateUser);
router.put('/banUser/:uid', [verifyAccessToken, isAdmin], authsController.banUserByAdmin);


module.exports = router;