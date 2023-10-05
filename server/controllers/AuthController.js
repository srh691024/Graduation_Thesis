const User = require('../models/User');
const asyncHandler = require('express-async-handler')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendMail');
const crypto = require('crypto');
const getStringUntilCharacter = require('../utils/getStringUntilCharacter');

// Refresh token => Cấp mới access token
// Access token => Xác thực user, phần quyền user
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: `Missing inputs`
        })

    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        // Tách password và role ra khỏi response 
        const { password, role, ...userData } = response.toObject()
        // Tạo access token
        const accessToken = generateAccessToken(response._id, role)
        // Tạo refresh token
        const refreshToken = generateRefreshToken(response._id)
        // Save refresh token into database
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true }) //new:true -- trả về data sau khi update
        // Lưu refresh token vào cookie 
        res.cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 }) //số mili giây trong 7 ngày
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })
    } else {
        throw new Error(`Invalid credentials`)
    }
})

// const register = asyncHandler(async (req, res) => {
//     let { email, password, name, username, gender, dob, phone } = req.body;
//     if (!email || !password)
//         return res.status(400).json({
//             success: false,
//             message: `Missing inputs`
//         })

//     const userByEmail = await User.findOne({ email })
//     if (userByEmail) throw new Error(`Email has existed!`)
//     const userByPhone = await User.findOne({ phone })
//     if (userByPhone) throw new Error(`Phone has existed!`)
//     const userByUsername = await User.findOne({ username })
//     if (userByUsername) throw new Error(`Username ${userByUsername.username} has existed`)
//     if(!username.trim()){
//         username = getStringUntilCharacter(email, '@')
//         name = getStringUntilCharacter(email, '@')
//     }
//     // const newUser = await User.create(req.body)
//     const newUser = await User.create({email, password, name,username, gender, dob, phone})
//     return res.status(200).json({
//         success: newUser ? true : false,
//         message: newUser ? 'Register is successfully.Please go login' : 'Something went wrong'
//     })
// })

const register = asyncHandler(async (req, res) => {
    let { email, password, name, username, gender, dob, phone } = req.body;
    if (!email || !password)
        return res.status(400).json({
            success: false,
            message: `Missing inputs`
        })
    const userByEmail = await User.findOne({ email })
    if (userByEmail) throw new Error(`Email has existed!`)
    const userByPhone = await User.findOne({ phone })
    if (userByPhone) throw new Error(`Phone has existed!`)
    const userByUsername = await User.findOne({ username })
    if (userByUsername) throw new Error(`Username ${userByUsername.username} has existed`)
    if (!username.trim() && !name.trim()) {
        username = getStringUntilCharacter(email, '@')
        name = getStringUntilCharacter(email, '@')
    }
    if (!username.trim() && name.trim()) {
        username = name.trim()
    }
    const registerToken = crypto.createHash('sha256').update(crypto.randomBytes(32).toString('hex')).digest('hex')
    res.cookie('dataRegister', { ...req.body, registerToken }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    const html = `Please click the link below to verify your account. This link will expire after 15 minutes. 
                    <a href=${process.env.URL_SERVER}/api/auth/final-register/${registerToken}>Click here</a>`
    await sendEmail({ email, html, subject: 'Final Registration for Love Diary account' })
    return res.json({
        success: true,
        message: 'Please check your email to verify your account'
    })
})

const finalRegister = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    const { registerToken } = req.params
    if (!cookie || cookie?.dataRegister?.registerToken !== registerToken) {
        res.clearCookie('dataRegister')
        return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`)
    }
    const newUser = await User.create({
        email: cookie?.dataRegister?.email,
        password: cookie?.dataRegister?.password,
        name: cookie?.dataRegister?.name,
        username: cookie?.dataRegister?.username,
        gender: cookie?.dataRegister?.gender,
        dob: cookie?.dataRegister?.dob,
        phone: cookie?.dataRegister?.phone
    })
    res.clearCookie('dataRegister')
    if (newUser) return res.redirect(`${process.env.URL_CLIENT}/finalregister/success`)
    else return res.redirect(`${process.env.URL_CLIENT}/finalregister/failed`)
})

const getCurrentUser = asyncHandler(async (req, res) => {
    const { _id } = req.user

    const user = await User.findById(_id).select('-refreshToken -password -role')
    return res.status(200).json({
        success: false,
        result: user ? user : 'User not found'
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    // Lấy token từ cookie
    const cookie = req.cookies
    // Check có token hay không
    if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookies')
    // Check token có hợp lệ không
    const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: result._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken({ _id: response._id, role: response.role }) : 'Refresh token not matched'
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookie')
    // Xóa refresh token ở db 
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    // Xóa refresh token ở cookie trình duyệt 
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({
        success: true,
        message: 'Log out is done'
    })
})

// Client gửi email 
// Server check email hợp lệ hay không => gửi mail + link (kèm theo token thay đổi password)
// Client check mail => click link 
// Client gửi API kèm token 
// Server check token giống với token server gửi mail hay không
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body
    if (!email) throw new Error('Missing email')
    const user = await User.findOne({ email })
    if (!user) throw new Error('User not found')
    const resetToken = user.createPasswordChangedToken()
    await user.save()

    const html = `Please click on the link below to change your password. This link will expire after 15 minutes. 
                    <a href=${process.env.URL_CLIENT}/resetpassword/${resetToken}>Click here</a>`
    const data = {
        email,
        html,
        subject: 'Forgot your password'
    }
    const result = await sendEmail(data)
    return res.status(200).json({
        success: result.response?.includes('OK') ? true : false,
        message: result.response?.includes('OK') ? 'Please check your email and follow the instructions' : 'An error occurred, please try again later!!!'
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error('Missing inputs')
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) throw new Error('Invalid reset token')
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        message: user ? 'Updated password' : 'Something went wrong'
    })
})

module.exports = {
    login,
    register,
    finalRegister,
    getCurrentUser,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
};