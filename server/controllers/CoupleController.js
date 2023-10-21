const User = require('../models/User');
const Couple = require('../models/Couple');
const asyncHandler = require('express-async-handler')
const uuid = require('uuid');
const Invitation = require('../models/Invitation');
const sendEmail = require('../utils/sendMail');
const makeToken = require('uniqid')

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

const sendInvitation = asyncHandler(async (req, res) => {
    const { email } = req.body
    const { _id } = req.user
    // const user = await User.findById(_id).select('-refreshToken -password -role')

    if (!email) return res.status(400).json({
        success: false,
        message: 'Missing email address'
    })

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
    }, [520000]);
    return res.json({
        success: true,
        result: newInvitation ? 'Send connection invitation successfully' : 'Send connection invitation failed'
    })
})

const acceptInvitation = asyncHandler(async (req, res) => {
    const { token } = req.params
    const { _id } = req.user
    const notAcceptedInvitation = await Invitation.findOne({ invitationId: new RegExp(`${token}$`) })
    if (notAcceptedInvitation) {
        notAcceptedInvitation.invitationId = atob(notAcceptedInvitation.invitationId.split('@')[0])
        await notAcceptedInvitation.save()
    } else {
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
        await coupleByInvitationId.save()
        await notAcceptedInvitation.deleteOne()
        const oldCouple = await Couple.findOneAndDelete({ createdUser: _id })
        
        // await Couple.updateOne({ loverUserId: _id })
        // await notAcceptedInvitation.deleteOne()
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

module.exports = {
    getCouple,
    getCoupleByCurrentUser,
    getCreateUserByCouple,
    sendInvitation,
    getCurrentInvitation,
    acceptInvitation,
}