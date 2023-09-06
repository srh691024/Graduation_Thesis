const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginAccount = new Schema({
    role: {type: Schema.Types.ObjectId, ref: 'Role'},
    email:{type: String, required: true, unique: true},
    password:{type: String, required: true, unique: true},
})

module.exports = mongoose.model('LoginAccount', LoginAccount);