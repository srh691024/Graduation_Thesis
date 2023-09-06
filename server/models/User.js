const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    loginAccount: {type: Schema.Types.ObjectId, ref: 'LoginAccount'},
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    avatar: { type: Buffer },
    phone: { type: Number },
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', User);
