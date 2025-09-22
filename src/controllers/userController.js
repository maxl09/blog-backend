const mongoose = require('mongoose')

const User = require('../models/User')

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.profilePic = async (req, res) => {
    try {
        const { userId } = req.params;

        const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

        if (!imageUrl) {
            return res.status(400).json({ error: "No image uploaded" });
        }

        const user = await User.findByIdAndUpdate(userId, { profilePic: imageUrl, new: true })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// exports.createFollow = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         // const { postId } = req.body;
//         const currentUserId = req.user.id;

//         const user = await User.findById(userId)
//         const currentUser = await User.findById(currentUserId)
//         if (!user.followers.includes(userId)) {
//             user.followers.push(userId);
//             currentUser.following.push(currentUserId);
//         } else {
//             user.followers.pull(userId);
//             currentUser.following.pull(currentUserId);
//         }
//         await user.save();
//         await currentUser.save();

//         res.json(user);
//         res.json(currentUser)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }
// }

exports.createFollow = async (req, res) => {
    try {
        const { userId } = req.params;           // user to follow/unfollow
        const currentUserId = req.user.id;       // logged in user

        console.log('req.user.id', req.user.id)

        if (userId === currentUserId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        const user = await User.findById(userId);
        const currentUser = await User.findById(currentUserId);

        if (!user || !currentUser) {
            return res.status(404).json({ error: "User not found" });
        }

        if (!user.followers.includes(currentUserId)) {
            user.followers.push(currentUserId);
            currentUser.following.push(userId);
        } else {
            user.followers.pull(currentUserId);
            currentUser.following.pull(userId);
        }

        await user.save();
        await currentUser.save();

        res.json({
            message: "Follow updated",
            user,
            currentUser
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
