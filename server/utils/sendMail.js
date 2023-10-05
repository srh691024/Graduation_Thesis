const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

const sendMail = asyncHandler(async ({ email, html, subject }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other post
        auth: {
            user: process.env.EMAIL_NAME,   //generate email user
            pass: process.env.EMAIL_APP_PASSWORD    //generate password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Love Diary" <no-reply@lovediary.com>', // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        // text: "Hello world?", // plain text body
        html: html, // html body
    });

    return info
})

module.exports = sendMail

