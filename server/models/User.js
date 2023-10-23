const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = new Schema({
    name: { type: String },
    username: { type: String, unique: true },
    gender: { type: String },
    dob: { type: Date },
    horoscope: { type: String, default: 'Aries' },
    address: { type: String },
    tiktokLink: { type: String },
    facebookLink: { type: String },
    instagramLink: { type: String },
    avatar: { type: String, default: 'https://res.cloudinary.com/dkgcwdrkw/image/upload/v1697672774/cld-sample.jpg' },
    phone: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user', },
    isBlocked: { type: Boolean, default: false },
    refreshToken: { type: String },
    passwordChangedAt: { type: String, },
    passwordResetToken: { type: String, },
    passwordResetExpires: { type: String, },
    registerToken: { type: String },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ]
}, {
    timestamps: true,
})

User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password, salt)
})

User.methods = {
    isCorrectPassword: async function (password) {
        return await bcrypt.compare(password, this.password)
    },
    createPasswordChangedToken: function () {
        const resetToken = crypto.randomBytes(32).toString('hex')
        this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
        this.passwordResetExpires = Date.now() + 15 * 60 * 1000
        return resetToken
    }
}

module.exports = mongoose.model('User', User);
