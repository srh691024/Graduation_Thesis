const express = require('express');
const router = express.Router();
const postsController = require('../controllers/PostController');
const { verifyAccessToken } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

router.post('/createPost', verifyAccessToken,uploadCloud.array('images', 5), postsController.createPost);
router.put('/updatePost/:postId', verifyAccessToken,uploadCloud.array('images', 5), postsController.updatePost);
router.delete('/deletePost/:postId', verifyAccessToken, postsController.deletePost);

router.get('/getPost/:postId', postsController.getPost);
router.get('/getAllPostsPublic', postsController.getAllPostsPublic);
router.get('/getPostsByCouple/:usernameCouple', postsController.getPostsByCouple);

router.patch('/likePost/:postId', verifyAccessToken, postsController.likePost);
router.put('/uploadImagesPost/:postId', verifyAccessToken,  postsController.uploadImagesPost);

router.patch('/addComment/:postId', verifyAccessToken, postsController.addComment);
router.delete('/:postId/comment/:commentId', verifyAccessToken, postsController.deleteComment);

module.exports = router;