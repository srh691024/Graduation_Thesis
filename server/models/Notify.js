const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notify = new Schema({
    couple: { type: Schema.Types.ObjectId, ref: 'Couple' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    recipients: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    // url: { type: String },
    text: { type: String },
    image: { type: String },
    isRead: { type: Boolean, default: false },
    type: { type: String },
}, {
    timestamps: true
})

module.exports = mongoose.model('Notify', Notify);