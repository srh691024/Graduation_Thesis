const asyncHandler = require('express-async-handler')
const Notify = require('../models/Notify');
const Couple = require('../models/Couple');

const createNotify = asyncHandler(async (req, res) => {
    const { _id } = req.user


    const { recipients, text, image , type} = req.body;
    if (recipients.includes(_id)) return;

    const notify = await Notify.create({ recipients, text, image, user: _id , type})
    return res.status(200).json({
        success: notify ? true : false,
        result: notify ? notify : 'Can not create notification'
    })
})

const removeNotify = asyncHandler(async (req, res) => {
    const { notiId } = req.params
    const notify = await Notify.findByIdAndDelete(notiId)
    return res.status(200).json({
        success: notify ? true : false,
        result: notify ? notify : 'Can not remove notification'
    })
})

const getNotify = asyncHandler(async (req, res) => {
    const {_id} = req.user
    const notifies = await Notify.find({recipients: _id }).sort('-createdAt').populate('user', 'avatar name')
    return res.status(200).json({
        success: notifies ? true : false,
        result: notifies ? notifies : 'No notifications were found'
    })
})


module.exports = {
    createNotify,
    removeNotify,
    getNotify
}