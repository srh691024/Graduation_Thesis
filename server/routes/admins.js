const express = require('express');
const router = express.Router();
const adminsController = require('../controllers/AdminController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

router.get('/getTotalStatistic', [verifyAccessToken, isAdmin], adminsController.getTotalStatistic);
router.get('/getPost12Months', [verifyAccessToken, isAdmin], adminsController.getPost12Months);
router.get('/getComments12Months', [verifyAccessToken, isAdmin], adminsController.getComments12Months);
router.get('/getAccounts12Months', [verifyAccessToken, isAdmin], adminsController.getAccounts12Months);
router.get('/getDataDoughnut', [verifyAccessToken, isAdmin], adminsController.getDataDoughnut);
router.get('/dataForBarStackChart', [verifyAccessToken, isAdmin], adminsController.dataForBarStackChart);

router.patch('/banReport/:postId', [verifyAccessToken, isAdmin], adminsController.banReport)
router.patch('/unBanReport/:postId', [verifyAccessToken, isAdmin], adminsController.unBanReport)

router.patch('/banAccount/:userId', [verifyAccessToken, isAdmin], adminsController.banAccount);
router.patch('/unBanAccount/:userId', [verifyAccessToken, isAdmin], adminsController.unBanAccount);

router.get('/getAllReports', [verifyAccessToken, isAdmin], adminsController.getAllReports);

router.patch('/responseProblem/:reportId', [verifyAccessToken, isAdmin], adminsController.responseProblem);
router.get('/getReportByUser', verifyAccessToken, adminsController.getReportByUser);
router.delete('/deleteReport/:reportId', verifyAccessToken, adminsController.deleteReport)


module.exports = router;