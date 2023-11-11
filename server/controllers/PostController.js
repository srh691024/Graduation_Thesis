const User = require('../models/User');
const Couple = require('../models/Couple');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler')
const uploadCloud = require('../config/cloudinary.config');
const deleteImage = require('../utils/deleteImage');


const createPost = asyncHandler(async (req, res) => {
    let { content, dateAnni, mode } = req.body;
    if (!dateAnni) dateAnni = new Date();
    if (!mode) mode = 'Private'


    const images = req.files?.map(el => el.path)
    if (images) req.body.images = images

    const imagesname = req.files?.map(el => el.filename)
    // if(imagesname) req.body.imagesname = imagesname
    // if (!content) throw new Error('Missing information')
    const { _id } = req.user;
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    const coupleId = couple._id;
    const newPost = await Post.create({ content, dateAnni, mode, images, couple: coupleId, author: _id, imagesname })
    return res.status(200).json({
        success: newPost ? true : false,
        result: newPost ? newPost : 'Can not create a new diary'
    })
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    let { content, dateAnni, mode, imagesLink, deletedImages, imagenames } = req.body;
    if (!dateAnni) dateAnni = new Date();
    if (!mode) mode = 'Private'

    if (deletedImages) {

        if (typeof deletedImages === 'string') {
            const array = []
            array.push(deletedImages)
            deleteImage(array)
        } else {
            deleteImage(deletedImages)
        }
    }

    // lọc file ra khỏi array 
    const imagesFileLink = (req.files || []).map(el => el.path)

    const imagesFileName = (req.files || []).map(el => el.filename)

    const allImageNames = (imagenames || []).concat(imagesFileName)
    // Gộp các đường dẫn URL hiện có và đường dẫn mới sau khi tải lên
    const allImageLinks = (imagesLink || []).concat(imagesFileLink);

    const updatePost = await Post.findByIdAndUpdate(postId, { content, dateAnni, mode, images: allImageLinks, imagesname: allImageNames }, { new: true })

    return res.status(200).json({
        success: updatePost ? true : false,
        result: updatePost ? updatePost : 'Can not update this diary'
    })
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const deletePost = await Post.findById(postId)
    if (!deletePost) throw new Error(`Couldn't find this diary`)
    deleteImage(deletePost.imagesname)

    await deletePost.deleteOne();

    return res.status(200).json({
        success: deletePost ? true : false,
        result: deletePost ? 'Delete successfully' : 'Can not delete this diary'
    })
})

const getPost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const post = await Post.findById(postId)
    return res.status(200).json({
        success: post ? true : false,
        result: post ? post : 'Can not find this diary'
    })
})

const getPostsByCouple = asyncHandler(async (req, res) => {
    const { usernameCouple } = req.params
    const couple = await Couple.findOne({ userNameCouple: usernameCouple })

    const posts = await Post.find({ couple: couple._id }).populate('couple', 'avatarCouple isConnected nameCouple createdUser loverUserId').populate('author', 'name avatar').populate('comments.postedBy', 'name avatar')
    return res.status(200).json({
        success: posts ? true : false,
        result: posts ? posts : 'No posts found'
    })
})

const getAllPostsPublic = asyncHandler(async (req, res) => {
    const postsPublic = await Post.find({ mode: 'Public' }).populate('couple', 'avatarCouple isConnected nameCouple createdUser loverUserId').populate('author', 'name avatar').populate('comments.postedBy', 'name avatar')
    return res.status(200).json({
        success: postsPublic ? true : false,
        result: postsPublic ? postsPublic : 'No posts is shared public'
    })
})

const likePost = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { postId } = req.params
    const post = await Post.findById(postId)
    if (!post) throw new Error('This diary is not available')
    const alreadyLiked = post?.likes?.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Post.findByIdAndUpdate(postId, { $pull: { likes: _id } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            result: response
        })
    } else {
        const ress = await Post.findByIdAndUpdate(postId, { $push: { likes: _id } }, { new: true })
        const response = await Post.findById(postId).populate('couple', 'createdUser loverUserId')
        return res.status(200).json({
            success: response ? true : false,
            result: response
        })
    }
})

const uploadImagesPost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    if (!req.files) throw new Error('No image to upload')
    const response = await Post.findByIdAndUpdate(postId, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Can not upload images'
    })
})
const addComment = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { postId } = req.params
    const { text } = req.body
    if (!postId) throw new Error('Can not find post')
    if (!text) throw new Error('Missing inputs')
    const cmt = await Post.findByIdAndUpdate(postId, { $push: { comments: { textComment: text, postedBy: _id } } }, { new: true })
    const comment = await Post.findById(postId).populate('couple', 'createdUser loverUserId')
    return res.json({
        success: comment ? true : false,
        result: comment ? comment : 'Add comment failed'
    })
})

const deleteComment = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { postId, commentId } = req.params
    if (!postId || !commentId) throw new Error('Can not find post or comment')
    const post = await Post.findById(postId)
    if (!post) {
        return res.status(404).json({ success: false, result: 'Post not found' });
    }
    const comment = post.comments.find((c) => c._id.toString() === commentId);

    if (!comment) {
        return res.status(404).json({ success: false, result: 'Comment not found' });
    }

    // Kiểm tra xem người dùng có quyền xóa comment hay không
    if (comment.postedBy.toString() !== _id.toString()) {
        return res.status(403).json({ success: false, message: 'You do not have permission to delete this comment' });
    }
    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);
    await post.save();
    return res.status(200).json({ success: true, result: 'Comment deleted successfully' });
})

const reportPost = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { postId } = req.params
    const post = await Post.findById(postId)
    if (!post) throw new Error('This diary is not available')
    const alreadyReported = post?.reports?.find(report => report.toString() === _id)
    if (alreadyReported) return res.status(400).json({ success: false, result: 'You are already reported this diary' })
    const addReport = await Post.findByIdAndUpdate(postId, { $push: { reports: _id } }, { new: true })
    return res.status(200).json({
        success: addReport ? true : false,
        result: addReport ? addReport : 'Can not report this diary'
    })
})

const getAllPosts = asyncHandler(async (req, res) => {
    const allPosts = await Post.find()
        .select('content likes comments author reports mode isBanned createdAt')
        .populate('author', 'avatar name')
    return res.status(200).json({
        success: true,
        result: allPosts
    })
})



module.exports = {
    createPost,
    getPost,
    getAllPostsPublic,
    updatePost,
    deletePost,
    likePost,
    uploadImagesPost,
    getPostsByCouple,
    addComment,
    deleteComment,
    reportPost,
    getAllPosts
}