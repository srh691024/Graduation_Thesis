const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Couple = new Schema({
    avatarCouple: {
        type: String, default: 'https://res.cloudinary.com/dkgcwdrkw/image/upload/v1697672730/sample.jpg'
    },
    avatarCouplename: { type: String },
    themes: { type: String, default: 'https://res.cloudinary.com/dkgcwdrkw/image/upload/v1697672730/sample.jpg' },
    createdUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loverUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    startLoveDate: { type: Date },
    isConnected: { type: Boolean },
    nameCouple: { type: String, default: 'Your coupler' },
    userNameCouple: { type: String, unique: true },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    totalLikes: { type: Number, default: 0 },
    biography: { type: String },
    tempAvatarLover: { type: String, default: 'https://res.cloudinary.com/dkgcwdrkw/image/upload/v1697672730/sample.jpg' },
    tempAvatarLoverName: { type: String, default: 'sample' },
    tempNameLover: { type: String, default: 'Your Lover' },
    tempDobLover: { type: Date, default: new Date() },
    tempHoroscope: { type: String, default: 'Aries' },
    startConnectedDate: { type: Date },
    disconnectedDate: { type: Date }
}, {
    timestamps: true,
}
)

module.exports = mongoose.model('Couple', Couple);
