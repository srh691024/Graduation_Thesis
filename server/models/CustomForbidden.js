const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomForbidden = new Schema({
    isApply: { type: Boolean, default: false },
    keyword: [
        { type: String }
    ],
    user: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('CustomForbidden', CustomForbidden)