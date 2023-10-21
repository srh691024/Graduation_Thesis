const express = require('express');
const router = express.Router();
const couplesController = require('../controllers/CoupleController');
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.get('/getCouple/:username', couplesController.getCouple);
router.get('/getCoupleByCurrentUser', verifyAccessToken, couplesController.getCoupleByCurrentUser);
router.get('/getCreatedUserByCouple/:createdUserId', couplesController.getCreateUserByCouple);
router.post('/sendInvitation/:email', verifyAccessToken, couplesController.sendInvitation);
router.get('/getCurrentInvitation', verifyAccessToken, couplesController.getCurrentInvitation);
router.put('/acceptInvitation/:token', verifyAccessToken, couplesController.acceptInvitation);


module.exports = router;