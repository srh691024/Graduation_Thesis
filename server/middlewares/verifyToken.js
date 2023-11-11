const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyAccessToken = asyncHandler(async (req, res, next) => {
    //Bearer token
    //headers: { authorization: Bearer token}
    if (req?.headers?.authorization?.startsWith('Bearer')) {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {    //decode - là cái bỏ vô hash để tạo accessToken, ví dụ userId, password
            if (err) return res.status(401).json({
                success: false,
                message: 'Invalid access token'
            })
            req.user = decode
            next()
        })
    } else {
        return res.status(401).json({
            success: false,
            message: 'Required authentication'
        })
    }
})

//phân quyền admin
const isAdmin = asyncHandler((req, res, next) => {
    const { role } = req.user
    if (role !== '22')
        return res.status(401).json({
            success: false,
            message: 'Your account is not an admin account!'
        })
    next()
})
module.exports = {
    verifyAccessToken,
    isAdmin,
}