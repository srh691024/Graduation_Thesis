const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Report = new Schema({
    content: { type: String },
    image: { type: String },
    imagename: { type: String },
    useSend: { type: Schema.Types.ObjectId, ref: 'User' },
    response: { type: String },
    isResponsed: { type: Boolean, default: false },

}, {
    timestamps: true,
})

module.exports = mongoose.model('Report', Report)