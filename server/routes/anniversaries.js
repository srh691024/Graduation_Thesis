const express = require('express');
const router = express.Router();
const anniversariesController = require('../controllers/AnniversaryController')
const { verifyAccessToken } = require('../middlewares/verifyToken');

router.post('/createAnniversary/:coupleId', verifyAccessToken, anniversariesController.createAnniversary);
router.get('/getAnniversariesByCouple/:coupleId', verifyAccessToken, anniversariesController.getAnniversariesByCouple);
router.post('/currentMonth/:coupleId', verifyAccessToken, anniversariesController.currentMonth)
router.patch('/updateEvent/:updateAnniId', verifyAccessToken, anniversariesController.updateEvent)
router.delete('/deleteEvent/:idAnni', verifyAccessToken, anniversariesController.deleteEvent)

module.exports = router