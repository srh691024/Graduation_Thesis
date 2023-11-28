const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Couple = new Schema({
    avatarCouple: {type: String},
    avatarCouplename: { type: String },
    themes: { type: String},
    themesName: { type: String },
    createdUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    loverUserId: { type: Schema.Types.ObjectId, ref: 'User' },
    startLoveDate: { type: Date },
    isConnected: { type: Boolean },
    nameCouple: { type: String, default: 'Your coupler' },
    userNameCouple: { type: String, unique: true },
    biography: { type: String },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    totalLikes: { type: Number, default: 0 },
    tempAvatarLover: { type: String},
    tempAvatarLoverName: { type: String},
    tempNameLover: { type: String, default: 'Your Lover' },
    tempDobLover: { type: Date, default: new Date() },
    tempHoroscope: { type: String, default: 'Aries' },
    startConnectedDate: { type: Date },
    disconnectedDate: { type: Date },
    isHidden: {type: Boolean, default: false}
}, {
    timestamps: true,
})
module.exports = mongoose.model('Couple', Couple);
