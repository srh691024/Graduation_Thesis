const express = require('express');
const router = express.Router();
const postsController = require('../controllers/PostController');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.post('/createPost', verifyAccessToken,uploader.array('images', 5), postsController.createPost);
router.put('/updatePost/:postId', verifyAccessToken, postsController.updatePost);
router.delete('/deletePost/:postId', verifyAccessToken, postsController.deletePost);
router.get('/getPost/:postId', postsController.getPost);
router.get('/getAllPosts', postsController.getAllPosts);
router.get('/getPostsByCouple/:usernameCouple', postsController.getPostsByCouple);

router.patch('/likePost/:postId', verifyAccessToken, postsController.likePost);
router.put('/uploadImagesPost/:postId', verifyAccessToken,  postsController.uploadImagesPost);

module.exports = router;