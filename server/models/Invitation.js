const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invitation = new Schema({
    invitationId: { type: String },
    createdTime: { type: Date },
    validHours: { type: Number, default: 24 },
    userSend: {type: Schema.Types.ObjectId, ref:'User'},
    type: {type: String, default: 'new'},
    coupleId: {type: Schema.Types.ObjectId, ref: 'Couple'},
    emailReceiveUser: {type: String},
}, {
    timestamps: true,
}
)

module.exports = mongoose.model('Invitation', Invitation);