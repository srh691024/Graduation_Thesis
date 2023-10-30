const User = require('../models/User');
const Couple = require('../models/Couple');
const asyncHandler = require('express-async-handler')
const uuid = require('uuid');
const Invitation = require('../models/Invitation');
const sendEmail = require('../utils/sendMail');
const makeToken = require('uniqid');
const deleteImage = require('../utils/deleteImage');

const getCouple = asyncHandler(async (req, res) => {
    const { username } = req.params
    const couple = await Couple.findOne({ userNameCouple: username })
    return res.status(200).json({
        success: couple ? true : false,
        result: couple ? couple : 'Couple not found'
    })
})

const getCoupleByCurrentUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id) throw new Error('Couple not found')
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    return res.status(200).json({
        success: couple ? true : false,
        result: couple ? couple : 'Couple not found'
    })
})

const getCreateUserByCouple = asyncHandler(async (req, res) => {
    const { createdUserId } = req.params
    if (!createdUserId) throw new Error('Cannot find this user')
    const createdUser = await User.findOne({ _id: createdUserId })
    return res.status(200).json({
        success: createdUser ? true : false,
        result: createdUser ? createdUser : 'Can not find this user'
    })
})

const getLoverUserByCouple = asyncHandler(async (req, res) => {
    const { loverUserId } = req.params
    if (!loverUserId) return res.status(200).json({
        success: false,
        message: `You haven't connected with your lover yet`
    })
    const loverUser = await User.findOne({ _id: loverUserId })
    return res.status(200).json({
        success: loverUser ? true : false,
        result: loverUser ? loverUser : 'Something went wrong'
    })
})

const sendInvitation = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { _id } = req.user
    // const user = await User.findById(_id).select('-refreshToken -password -role')

    if (!email) return res.status(400).json({
        success: false,
        message: 'Missing email address'
    })

    //check if invitation have
    const checkInvitation = await Invitation.findOne({ userSend: _id })
    if (checkInvitation) return res.status(400).json({ success: false, result: "You have already send connection invitation today. Please cancel that connection invitation and try again." })

    //check if user have couple
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (couple.isConnected) return res.status(400).json({ success: false, result: "You have already connected to lover. You can not send invitation for orther" })

    //check email user enter
    const userEmail = await User.findOne({ email })
    if (userEmail) {
        if (userEmail._id.toString() === _id) return res.status(400).json({ success: false, result: "You can not send invitation for yourself" })
        const checkCouple = await Couple.findOne({ $or: [{ createdUser: userEmail._id }, { loverUserId: userEmail._id }] })
        if (checkCouple.isConnected) return res.status(400).json({ success: false, result: "This user is already connected" })
        return res.status(200).json({ success: true, result: "Send invitation to your lover successfully" })
    } else {

        //check if the receiver is already connected
        const connectionCode = makeToken()
        const invitationIdEdited = btoa(_id) + '@' + connectionCode;

        const newInvitation = await Invitation.create({
            invitationId: invitationIdEdited,
            createdTime: new Date(),
            validHours: 24,
            isCanceled: false,
            userSend: _id
        });

        if (newInvitation) {
            const html = `<ul>
        <li>You have received a connection invitation from your loved one on LoDi - Love Diary. Enter the connection code on LoDi to accept the connection invitation from your loved one. (Setting > Manage connection)</li>
        <li>The connection code will expire 24 hours from the time it was sent. After 24 hours, please ask the other person to send another invitation.</li>
        <li>If the other person cancels the invitation after sending the connection code, the connection cannot be established.</li>
        <br />
        <h1>Important</h1>
        <li>You need to connect using the email account that received the connection invitation to ensure a 100% successful connection.</li>
        <li>It is recommended that you register a LoDi account before accepting the invitation to ensure a 100% successful connection.</li>
        <li>Connection code: 
        <blockquote>${connectionCode}</blockquote>
        </a>
        </li>
        </ul>`;
            await sendEmail({ email, html, subject: 'Connection invitation from your lover on LoDi - LoveDiary' })
        }
        setTimeout(async () => {
            await Invitation.deleteOne({ invitationId: invitationIdEdited })
        }, 10 * 60 * 1000);
        return res.json({
            success: true,
            result: newInvitation ? 'Send connection invitation to email lover successfully' : 'Send connection invitation failed'
        })
    }
})

const cancelInvitation = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const checkInvitation = await Invitation.findOne({ userSend: _id });
    if (!checkInvitation) return res.status(400).json({ success: false, result: "No invitation found" })
    if (checkInvitation.userSend.toString() !== _id) return res.status(400).json({ success: false, result: "You dont have permission to delete this invitation" })

    const { invitationId } = req.params;
    const deleteInvi = await Invitation.findByIdAndDelete(invitationId);
    return res.status(200).json({
        success: deleteInvi ? true : false,
        result: deleteInvi ? "Invitation deleted successfully" : 'Delete connection invitation failed'
    })
})

const acceptInvitation = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { _id } = req.user

    //check user
    const couple = await Couple.findOne({ $or: [{ createdUser: _id }, { loverUserId: _id }] })
    if (couple.isConnected) return res.status(400).json({ success: false, result: "You have already connected with your lover. Can not accept the other invitation" })


    const notAcceptedInvitation = await Invitation.findOne({ invitationId: new RegExp(`${token}$`) })
    if (notAcceptedInvitation) {
        if (notAcceptedInvitation.userSend.toString() === _id) {
            return res.status(400).json({ success: false, result: "You can not accept the invitation of yourself" })
        } else {
            notAcceptedInvitation.invitationId = atob(notAcceptedInvitation.invitationId.split('@')[0])
            await notAcceptedInvitation.save()
        }
    }
    else {
        return res.status(400).json({
            success: false,
            result: 'Can not find the connection invitation'
        })
    }

    const coupleByInvitationId = await Couple.findOne({ createdUser: notAcceptedInvitation.invitationId })
    if (coupleByInvitationId) {
        coupleByInvitationId.loverUserId = _id
        coupleByInvitationId.isConnected = true
        coupleByInvitationId.tempNameLover = ''
        coupleByInvitationId.tempDobLover = null
        coupleByInvitationId.tempHoroscope = ''
        coupleByInvitationId.tempAvatarLover = ''
        coupleByInvitationId.tempAvatarLoverName = ''
        coupleByInvitationId.startConnectedDate = new Date()
        await coupleByInvitationId.save()
        await notAcceptedInvitation.deleteOne()
        const oldCouple = await Couple.findOneAndDelete({ createdUser: _id })
    }
    return res.status(200).json({
        success: coupleByInvitationId ? true : false,
        result: coupleByInvitationId ? coupleByInvitationId : 'Something went wrong. Can not accept the connection invitation'
    })
})

const getCurrentInvitation = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const invitationCurrentUser = await Invitation.findOne({ userSend: _id })
    return res.status(200).json({
        success: invitationCurrentUser ? true : false,
        result: invitationCurrentUser ? invitationCurrentUser : 'You dont have any connection invitation'
    })
})

const disconnectConnection = asyncHandler(async (req, res) => {

})

const editInfoCouple = asyncHandler(async (req, res) => {
    let { biography, imageCouple, nameCouple, startLoveDate, usernameCouple, imagename } = req.body
    const { coupleId } = req.params
    const { _id } = req.user
    const couple = await Couple.findById(coupleId)
    if (!couple) return res.status(404).json({ success: false, result: "Can not find Couple" })
    if (couple.createdUser.toString() === _id || couple.loverUserId?.toString() === _id) {
        if (!startLoveDate) startLoveDate = new Date()
        if (!nameCouple) nameCouple = usernameCouple
        if (typeof imageCouple !== 'string') {
            const array = []
            array.push(imagename)
            deleteImage(array)
            imageCouple = req.file.path
            imagename = req.file.filename
        }

        const updateInfoCouple = await Couple.findByIdAndUpdate(coupleId, { biography, avatarCouple: imageCouple, nameCouple, startLoveDate, userNameCouple: usernameCouple, avatarCouplename: imagename }, { new: true })
        return res.status(200).json({
            success: updateInfoCouple ? true : false,
            result: updateInfoCouple ? updateInfoCouple : "Can not update this Couple"
        })
    } else {
        return res.status(400).json({
            success: false,
            result: "You are not allowed to update this Couple"
        })
    }
})

const editTempLoverUser = asyncHandler(async (req, res) => {
    let { tempAvatarLover, tempAvatarLoverName, tempNameLover, tempDobLover, tempHoroscope } = req.body
    if (!tempNameLover) throw new Error('Missing input')
    if (!tempHoroscope) tempHoroscope = 'Aries'
    const { _id } = req.user
    const { coupleId } = req.params
    const couple = await Couple.findById(coupleId)
    if (!couple) return res.status(404).json({ success: false, result: "Can not find Couple" })
    if (couple.createdUser.toString() === _id) {
        if (typeof tempAvatarLover !== 'String') {
            const array = []
            array.push(tempAvatarLoverName)
            deleteImage(array)
            tempAvatarLover = req.file?.path
            tempAvatarLoverName = req.file?.filename
        }

        const updateInfoLover = await Couple.findByIdAndUpdate(coupleId, { tempAvatarLover, tempAvatarLoverName, tempNameLover, tempDobLover, tempHoroscope })
        res.status(200).json({
            success: updateInfoLover ? true : false,
            result: updateInfoLover ? updateInfoLover : 'Can not update this info lover'
        })
    } else {
        return res.status(400).json({
            success: false,
            result: "You are not allowed to update this Couple"
        })
    }
})

const followCouple = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { coupleId } = req.params;

    const couple = await Couple.findById(coupleId);
    if (!couple) throw new Error('Couple not found')
    const alreadyFollowed = couple?.followers?.find(el => el.toString() === _id)
    if (alreadyFollowed) {
        const response = await Couple.findByIdAndUpdate(coupleId, { $pull: { followers: _id } }, { new: true })
        await User.findByIdAndUpdate(_id, { $pull: { followings: coupleId } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            result: response ? response : 'Unfollow failed'
        })
    } else {
        const response = await Couple.findByIdAndUpdate(coupleId, { $push: { followers: _id } }, { new: true })
        await User.findByIdAndUpdate(_id, { $push: { followings: coupleId } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            result: response ? response : 'Follow failed'
        })
    }
})


module.exports = {
    getCouple,
    getCoupleByCurrentUser,
    getCreateUserByCouple,
    sendInvitation,
    getCurrentInvitation,
    acceptInvitation,
    getLoverUserByCouple,
    disconnectConnection,
    editInfoCouple,
    editTempLoverUser,
    cancelInvitation,
    followCouple
}