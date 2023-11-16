const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const crypto = require('crypto');

const User = new Schema({
    name: { type: String, maxLength: 30 },
    username: { type: String, unique: true, maxLength: 24 },
    gender: { type: String },
    dob: { type: Date },
    horoscope: { type: String, default: 'Aries' },
    address: { type: String },
    tiktokLink: { type: String },
    facebookLink: { type: String },
    instagramLink: { type: String },
    avatarname: { type: String },
    avatar: { type: String },
    phone: { type: String },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) =>
                /^[\w\-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
            message: 'Please enter a valid email address',
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) =>
                /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value),
            message:
                'Password must contain at least 1 digit, 1 lowercase letter, 1 uppercase letter, and be at least 6 characters long',
        },
    },
    role: {
        type: String,
        enum: [22, 16], //22 - admin, 16 - user
        default: 16,
    },
    isBlocked: { type: Boolean, default: false },
    reports: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    refreshToken: { type: String },
    passwordChangedAt: { type: String, },
    passwordResetToken: { type: String, },
    passwordResetExpires: { type: String, },
    registerToken: { type: String },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Couple',
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
