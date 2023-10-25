const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    content: { type: String },
    images: { type: Array },
    imagesname: { type: Array },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        textComment: { type: String },
        created: { type: Date, default: Date.now() },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    }],
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    reports: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    couple: { type: Schema.Types.ObjectId, ref: 'Couple' },
    dateAnni: { type: Date, default: Date.now() },
    mode: { type: String, default: 'Private' },
    isHidden: { type: Boolean, default: false },
}, {
    timestamps: true,
}
)

module.exports = mongoose.model('Post', Post);
