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

        const user = await User.findByIdAndUpdate({ userId, profilePic: imageUrl })
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}