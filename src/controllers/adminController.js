const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.users = async (req, res) => {
    try {
        const users = await User.find().select('username name profilePic isAdmin posts')
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findByIdAndDelete(userId);
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}