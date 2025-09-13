const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    caption: { type: String, trim: true },
    image: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, //post creator
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], //users who liked
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] // references to comments
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)