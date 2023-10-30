const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Anniversary = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    coupleId: { type: Schema.Types.ObjectId, ref: 'Couple', required: true },
    allDay: {type: Boolean, default: true},
    isHidden: { type: Boolean, default: true },
    color: { type: String, default: '#fe6e91'}
}, {
    timestamps: true,
})

module.exports = mongoose.model('Anniversary', Anniversary)