const express = require('express');
const router = express.Router();
const postsController = require('../controllers/PostController');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploadCloud = require('../config/cloudinary.config');

router.post('/createPost', verifyAccessToken, uploadCloud.array('images', 5), postsController.createPost);
router.put('/updatePost/:postId', verifyAccessToken, uploadCloud.array('images', 5), postsController.updatePost);
router.delete('/deletePost/:postId', verifyAccessToken, postsController.deletePost);

router.get('/getPost/:postId', postsController.getPost);
router.get('/getAllPostsPublic', postsController.getAllPostsPublic);
router.get('/getPostsByCouple/:usernameCouple', postsController.getPostsByCouple);

router.patch('/likePost/:postId', verifyAccessToken, postsController.likePost);
router.put('/uploadImagesPost/:postId', verifyAccessToken, postsController.uploadImagesPost);

router.patch('/addComment/:postId', verifyAccessToken, postsController.addComment);
router.delete('/:postId/comment/:commentId', verifyAccessToken, postsController.deleteComment);

router.patch('/reportPost/:postId', verifyAccessToken, postsController.reportPost);

router.get('/getAllPosts', [verifyAccessToken, isAdmin], postsController.getAllPosts);

router.get('/searchPublic', verifyAccessToken, postsController.searchPublic);

router.post('/changeStatusFilterComment', verifyAccessToken, postsController.changeStatusFilterComment);
router.post('/changeContentCustomFilterComment', verifyAccessToken, postsController.changeContentCustomFilterComment);
router.get('/getCustomForbidden', verifyAccessToken, postsController.getCustomForbidden);
router.get('/followingPost', verifyAccessToken, postsController.followingPost);


module.exports = router;