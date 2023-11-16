const express = require('express');
const router = express.Router();
const authsController = require('../controllers/AuthController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

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
router.put('/updateUser', verifyAccessToken, uploadCloud.single('avatarUser'), authsController.updateUser);
router.put('/banUser/:uid', [verifyAccessToken, isAdmin], authsController.banUserByAdmin);
router.get('/searchUser', verifyAccessToken, authsController.searchUser);

router.patch('/reportAccount/:userId', verifyAccessToken, authsController.reportAccount);
router.post('/changePassword', verifyAccessToken, authsController.changePassword);

router.post('/reportProblem', verifyAccessToken, uploadCloud.single('image'), authsController.reportProblem);


module.exports = router;