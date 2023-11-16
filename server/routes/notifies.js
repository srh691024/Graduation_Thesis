const express = require('express');
const router = express.Router();
const notifiesController = require('../controllers/NotifyController')
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/createNotify', verifyAccessToken, notifiesController.createNotify)
router.get('/getNotify', verifyAccessToken, notifiesController.getNotify)
router.patch('/isReadNotify/:notiId', verifyAccessToken, notifiesController.isReadNotify)

module.exports = router