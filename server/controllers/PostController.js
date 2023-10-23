const User = require('../models/User');
const Couple = require('../models/Couple');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler')


const createPost = asyncHandler(async (req, res) => {
    let { content, dateAnni, mode } = req.body;
    if (!dateAnni) dateAnni = new Date();
    if (!mode) mode = 'Private'
    const images = req.files?.map(el => el.path)
    if (images) req.body.images = images
    // if (!content) throw new Error('Missing information')
    const { _id } = req.user;
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    const coupleId = couple._id;
    const newPost = await Post.create({ content, dateAnni, mode, images, couple: coupleId, author: _id })
    return res.status(200).json({
        success: newPost ? true : false,
        result: newPost ? newPost : 'Can not create a new diary'
    })
})

const updatePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const updatePost = await Post.findByIdAndUpdate(postId, req.body, { new: true })

    return res.status(200).json({
        success: updatePost ? true : false,
        result: updatePost ? updatePost : 'Can not update this diary'
    })
})

const deletePost = asyncHandler(async (req, res) => {
    const { postId } = req.params
    const deletePost = await Post.findByIdAndDelete(postId)

    return res.status(200).json({
        success: deletePost ? true : false,
        result: deletePost ? deletePost : 'Can not delete this diary'
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
   
    const posts = await Post.find({ couple: couple._id }).populate('couple', 'avatarCouple isConnected nameCouple createdUser loverUserId').populate('author','name avatar')
    return res.status(200).json({
        success: posts ? true : false,
        result: posts ? posts : 'No posts found'
    })
})

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find()
    return res.status(200).json({
        success: posts ? true : false,
        result: posts ? posts : 'Can not find any diary'
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
        return res.json({
            success: response ? true : false,
            result: response
        })
    } else {
        const response = await Post.findByIdAndUpdate(postId, { $push: { likes: _id } }, { new: true })
        return res.json({
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



module.exports = {
    createPost,
    getPost,
    getAllPosts,
    updatePost,
    deletePost,
    likePost,
    uploadImagesPost,
    getPostsByCouple
}