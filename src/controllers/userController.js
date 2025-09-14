const mongoose = require('mongoose')

const User = require('../models/User')

exports.getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = User.findById(userId)
        res.json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}