const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Invitation = new Schema({
    invitationId: { type: String },
    createdTime: { type: Date },
    validHours: { type: Number, default: 24 },
    isCanceled: { type: Boolean },
    userSend: {type: Schema.Types.ObjectId, ref:'User'},
    
}, {
    timestamps: true,
}
)

module.exports = mongoose.model('Invitation', Invitation);