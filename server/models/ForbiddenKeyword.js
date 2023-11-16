const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ForbiddenKeywords = new Schema({
    keyword: { type: String, required: true, unique: true },
})

module.exports = mongoose.model('ForbiddenKeywords', ForbiddenKeywords)