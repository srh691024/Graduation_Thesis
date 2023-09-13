const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    dob: { type: Date, required: true },
    avatar: { type: Buffer },
    phone: { type: String},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true, unique: true},
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
}, {
    timestamps: true,
})

module.exports = mongoose.model('User', User);
