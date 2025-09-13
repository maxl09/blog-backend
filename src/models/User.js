const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    bio: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },

    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }], //user posts
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Saved' }], //saved posts
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);