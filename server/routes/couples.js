const express = require('express');
const router = express.Router();
const couplesController = require('../controllers/CoupleController');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

router.get('/getCouple/:username', couplesController.getCouple);
router.get('/getCoupleByCurrentUser', verifyAccessToken, couplesController.getCoupleByCurrentUser);
router.get('/getCreatedUserByCouple/:createdUserId', couplesController.getCreateUserByCouple);
router.get('/getLoverUserByCouple/:loverUserId', couplesController.getLoverUserByCouple);
router.post('/sendInvitation/:email', verifyAccessToken, couplesController.sendInvitation);
router.get('/getCurrentInvitation', verifyAccessToken, couplesController.getCurrentInvitation);
router.delete('/cancelInvitation/:invitationId', verifyAccessToken, couplesController.cancelInvitation);
router.put('/acceptInvitation/:token', verifyAccessToken, couplesController.acceptInvitation);
router.put('/editInfoCouple/:coupleId', verifyAccessToken, uploadCloud.single('imageCouple'), couplesController.editInfoCouple);
router.patch('/editTempLoverUser/:coupleId', verifyAccessToken, uploadCloud.single('tempAvatarLover'), couplesController.editTempLoverUser);
router.patch('/followCouple/:coupleId', verifyAccessToken, couplesController.followCouple);


module.exports = router;