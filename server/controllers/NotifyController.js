const asyncHandler = require('express-async-handler')
const Notify = require('../models/Notify');
const Couple = require('../models/Couple');

const createNotify = asyncHandler(async (req, res) => {
    const { _id } = req.user


    const { recipients, text, image, type } = req.body;
    if (recipients.includes(_id)) return;

    const notify = await Notify.create({ recipients, text, image, user: _id, type })
    const response = await Notify.findById(notify._id).populate('user', 'avatar name')
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Can not create notification'
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
    const { _id } = req.user
    const notifies = await Notify.find({ recipients: _id }).sort('-createdAt').populate('user', 'avatar name')
    return res.status(200).json({
        success: notifies ? true : false,
        result: notifies ? notifies : 'No notifications were found'
    })
})

const isReadNotify = asyncHandler(async (req, res) => {
    const { notiId } = req.params
    const notify = await Notify.findByIdAndUpdate(notiId, { isRead: true }, { new: true })
    return res.status(200).json({
        success: notify ? true : false,
        result: notify ? notify : 'Read notify went wrong'
    })
})

const deleteAllNotifies = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const notifies = await Notify.deleteMany({ recipients: _id })
    return res.status(200).json({
        success: notifies ? true : false,
        result: notifies ? notifies : 'Delete notify went wrong'
    })
})


module.exports = {
    createNotify,
    removeNotify,
    getNotify,
    isReadNotify,
    deleteAllNotifies
}