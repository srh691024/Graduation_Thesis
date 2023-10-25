const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Todo = new Schema({
    content: { type: String, required: true },
    completed: { type: Boolean, default: false },
    type: {
        type: String,
        // enum: ['Physical Touch', 'Acts of Service', 'Quality Time', 'Words of Affirmation', 'Receiving Gifts']
    },
    isImportant: { type: Boolean, default: false },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    dueDate: { type: Date, default: Date.now() },
    coupleId: { type: Schema.Types.ObjectId, ref: 'Couple' },
    isHidden: { type: Boolean, default: false },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Todo', Todo)