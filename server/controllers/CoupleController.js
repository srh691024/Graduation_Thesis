const User = require('../models/User');
const Couple = require('../models/Couple');
const Anniversary = require('../models/Anniversary');
const Todo = require('../models/Todo');
const Post = require('../models/Post');
const asyncHandler = require('express-async-handler')
const uuid = require('uuid');
const Invitation = require('../models/Invitation');
const sendEmail = require('../utils/sendMail');
const makeToken = require('uniqid');
const deleteImage = require('../utils/deleteImage');
const getStringUntilCharacter = require('../utils/getStringUntilCharacter');

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
    const couple = await Couple.findOne({ $and: [{ $or: [{ createdUser: _id }, { loverUserId: _id }] }, { isHidden: false }] })
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

    const connectionCode = makeToken()
    const invitationIdEdited = btoa(email) + '@' + connectionCode;
    //check if invitation have
    const checkInvitation = await Invitation.findOne({ userSend: _id })
    if (checkInvitation) return res.status(400).json({ success: false, result: "You have already send connection invitation today. Please cancel that connection invitation and try again." })

    //check if user have couple
    const couple = await Couple.findOne({ $and: [{ $or: [{ createdUser: _id }, { loverUserId: _id }] }, { isHidden: false }] })
    if (couple.isConnected) return res.status(400).json({ success: false, result: "You have already connected to lover. You can not send invitation for orther" })

    //check email user enter
    const userEmail = await User.findOne({ email })
    if (userEmail) {
        if (userEmail._id.toString() === _id) return res.status(400).json({ success: false, result: "You can not send invitation for yourself" })
        const checkCouple = await Couple.findOne({ $and: [{ $or: [{ createdUser: userEmail._id }, { loverUserId: userEmail._id }] }, { isHidden: false }] })
        if (checkCouple.isConnected) return res.status(400).json({ success: false, result: "This user is already connected" })

        const newInvitation = await Invitation.create({
            invitationId: invitationIdEdited,
            createdTime: new Date(),
            validHours: 24,
            userSend: _id,
            type: 'new',
            emailReceiveUser: email
        })
        return res.status(200).json({
            success: newInvitation ? true : false,
            result: newInvitation ? "Send invitation to your lover successfully" : 'Can not send invitation to your lover'
        })

    } else {
        const newInvitation = await Invitation.create({
            invitationId: invitationIdEdited,
            createdTime: new Date(),
            validHours: 24,
            userSend: _id,
            type: 'new',
            emailReceiveUser: email
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
    const { invitationId } = req.params;

    const checkInvitation = await Invitation.findOne({ userSend: _id });
    if (!checkInvitation) return res.status(400).json({ success: false, result: "No invitation found" })
    if (checkInvitation.userSend.toString() !== _id) return res.status(400).json({ success: false, result: "You dont have permission to delete this invitation" })

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
        const oldCouple = await Couple.findOneAndDelete({ $and: [{ createdUser: _id }, { isHidden: false }] })
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


const disconnectConnection = asyncHandler(async (req, res) => {
    const { agree } = req.body
    const { coupleId } = req.params
    if (agree !== 'I agree') throw new Error('Your acceptance is invalid')
    const findCouple = await Couple.findById(coupleId).populate('createdUser', 'email').populate('loverUserId', 'email')
    if (!findCouple) throw new Error('Can not find this couple')

    const hiddenAnni = await Anniversary.updateMany({ coupleId }, { $set: { isHidden: true } })
    const hiddenPost = await Post.updateMany({ couple: coupleId }, { $set: { isHidden: true } })
    const hiddenTodo = await Todo.updateMany({ coupleId }, { $set: { isHidden: true } })

    const newCoupleCreatedUser = await Couple.create({
        createdUser: findCouple.createdUser._id,
        startLoveDate: new Date(),
        isConnected: false,
        userNameCouple: getStringUntilCharacter(findCouple.createdUser.email, '@') + '@' + makeToken(),
    })

    const newCoupleLoverUser = await Couple.create({
        createdUser: findCouple.loverUserId._id,
        startLoveDate: new Date(),
        isConnected: false,
        userNameCouple: getStringUntilCharacter(findCouple.loverUserId.email, '@') + '@' + makeToken(),
    })

    findCouple.disconnectedDate = new Date()
    findCouple.isHidden = true
    findCouple.isConnected = false
    await findCouple.save()

    return res.status(200).json({
        success: findCouple ? true : false,
        result: findCouple ? findCouple : 'Can not disconnect'
    })
})

const getHistoryCoupleByCurrentUser = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const historyCouple = await Couple.find({ $and: [{ $or: [{ createdUser: _id }, { loverUserId: _id }] }, { isHidden: true }] }).populate('createdUser', 'name').populate('loverUserId', 'name')
    return res.status(200).json({
        success: historyCouple ? true : false,
        result: historyCouple ? historyCouple : 'No history connection found'
    })
})

const inviteRestoreCouple = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { coupleId } = req.params

    const findUser = await User.findById(_id)

    const checkCoupleUser = await Couple.findOne({ $and: [{ $or: [{ createdUser: _id }, { loverUserId: _id }] }, { isHidden: false }] })
    if (checkCoupleUser.isConnected) throw new Error('You already has a couple. Cannot restore this couple.')

    //check if invitation have
    const checkInvitation = await Invitation.findOne({ userSend: _id })
    if (checkInvitation) return res.status(400).json({ success: false, result: "You have already send connection invitation today. Please cancel that connection invitation and try again." })

    const couple = await Couple.findById(coupleId).populate('createdUser', 'email').populate('loverUserId', 'email')
    if (couple) {
        let emailUser = ''
        if (couple.createdUser.email === findUser.email) {
            emailUser = couple.loverUserId.email
        } else {
            emailUser = couple.createdUser.email
        }

        const connectionCode = makeToken()
        const invitationIdEdited = btoa(emailUser) + '@' + connectionCode;

        const newInvitation = await Invitation.create({
            invitationId: invitationIdEdited,
            createdTime: new Date(),
            validHours: 24,
            userSend: _id,
            type: 'restore',
            coupleId: coupleId,
            emailReceiveUser: emailUser
        });

        setTimeout(async () => {
            await Invitation.deleteOne({ invitationId: invitationIdEdited })
        }, 10 * 60 * 1000);

        return res.status(200).json({
            success: newInvitation ? true : false,
            result: newInvitation ? 'Send restore invitation successfully' : 'Can not send restore invitation'
        })

    } else {
        return res.status(400).json({
            success: false,
            result: 'Can not find this couple'
        })
    }
})

const acceptRestoreCouple = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { invitationId } = req.params

    const checkCoupleUser = await Couple.findOne({ $and: [{ $or: [{ createdUser: _id }, { loverUserId: _id }] }, { isHidden: false }] })
    if (checkCoupleUser.isConnected) return res.status(400).json({ success: false, result: 'You already has a couple. Cannot restore this couple.' })

    const invitation = await Invitation.findById(invitationId)
    if (!invitation) return res.status(400).json({ success: false, result: 'No invitation found' })

    const checkUserSend = await Couple.findOne({ $and: [{ $or: [{ createdUser: invitation.userSend }, { loverUserId: invitation.userSend }] }, { isHidden: false }] })
    if (checkUserSend.isConnected) return res.status(400).json({ success: false, result: 'Something went wrong. Cannot accept this invitation.' })

    const restoreCouple = await Couple.findById(invitation.coupleId)
    if (!restoreCouple) return res.status(400).json({ success: false, result: 'Could not find data for this couple' })

    const hiddenAnni = await Anniversary.updateMany({ coupleId: invitation.coupleId }, { $set: { isHidden: false } })
    const hiddenPost = await Post.updateMany({ couple: invitation.coupleId }, { $set: { isHidden: false } })
    const hiddenTodo = await Todo.updateMany({ coupleId: invitation.coupleId }, { $set: { isHidden: false } })


    const deleteLoverUserCouple = await Couple.findOne({ $and: [{ createdUser: _id }, { isConnected: false }, { isHidden: false }] })
    const delPostUserOne = await Post.deleteMany({ couple: deleteLoverUserCouple._id })
    const delAnniUserOne = await Anniversary.deleteMany({ coupleId: deleteLoverUserCouple._id })
    await deleteLoverUserCouple.deleteOne()

    const deletePartnerCouple = await Couple.findOne({ $and: [{ createdUser: invitation.userSend }, { isConnected: false }, { isHidden: false }] })
    const delPostUserTwo = await Post.deleteMany({ couple: deletePartnerCouple._id })
    const delAnniUserTwo = await Anniversary.deleteMany({ coupleId: deletePartnerCouple._id })
    await deletePartnerCouple.deleteOne()


    restoreCouple.isConnected = true
    restoreCouple.startConnectedDate = new Date()
    restoreCouple.isHidden = false
    await invitation.deleteOne()
    await restoreCouple.save()
    return res.status(200).json({
        success: restoreCouple ? true : false,
        result: restoreCouple ? restoreCouple : 'Can not restore this couple'
    })
})

const getListInvitation = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById(_id)
    const invitationList = await Invitation.find({ emailReceiveUser: user.email }).populate('userSend', 'avatar name')
    return res.status(200).json({
        success: invitationList ? true : false,
        result: invitationList ? invitationList : 'Dont have any invitation'
    })
})

const acceptInvitationTwo = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { invitationId } = req.params

    const checkCoupleUser = await Couple.findOne({ $and: [{ $or: [{ createdUser: _id }, { loverUserId: _id }] }, { isHidden: false }] })
    if (checkCoupleUser.isConnected) return res.status(400).json({ success: false, result: 'You already has a couple. Cannot connect other user' })

    const invitation = await Invitation.findById(invitationId)
    if (!invitation) return res.status(400).json({ success: false, result: 'No invitation found' })

    const checkUserSend = await Couple.findOne({ $and: [{ $or: [{ createdUser: invitation.userSend }, { loverUserId: invitation.userSend }] }, { isHidden: false }] })
    if (checkUserSend.isConnected) return res.status(400).json({ success: false, result: 'Something went wrong. Cannot accept this invitation.' })

    checkUserSend.loverUserId = _id
    checkUserSend.isConnected = true
    checkUserSend.tempNameLover = ''
    checkUserSend.tempDobLover = null
    checkUserSend.tempHoroscope = ''
    checkUserSend.tempAvatarLover = ''
    checkUserSend.tempAvatarLoverName = ''
    checkUserSend.startConnectedDate = new Date()
    await checkUserSend.save()
    await invitation.deleteOne()
    const oldCouple = await Couple.findOneAndDelete({ $and: [{ createdUser: _id }, { isHidden: false }] })

    return res.status(200).json({
        success: checkUserSend ? true : false,
        result: checkUserSend ? checkUserSend : 'Can not accept this invitation'
    })
})

const searchCouple = asyncHandler(async (req, res) => {
    const { username } = req.query
    const couples = await Couple.find(
        {
            $and:
                [
                    {
                        $or: [
                            { userNameCouple: { $regex: username, $options: 'i' } },
                            { nameCouple: { $regex: username, $options: 'i' } }
                        ]
                    },
                    { isConnected: true }
                ]
        }).limit(8)
    return res.status(200).json({
        success: couples ? true : false,
        result: couples
    })
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
    followCouple,
    getHistoryCoupleByCurrentUser,
    inviteRestoreCouple,
    acceptRestoreCouple,
    getListInvitation,
    acceptInvitationTwo,
    searchCouple
}