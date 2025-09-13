const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.users = async (req, res) => {
    try {
        const users = await User.find().select('username name profilePic isAdmin')
        res.json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}