const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
    try {
        const { name, username, password, isAdmin } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, username, password: hashedPassword, isAdmin });
        res.json({ message: 'User created successfully!' })
    } catch (error) {

        res.status(400).json({ error: 'User already exists ' })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })
        if (!user) return res.status(404).json({ error: 'User not found ' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ error: 'Invalid Password' })

        // const token = jwt.sign({ id: user._id, }, process.env.JWT_SECRET, { expiresIn: '1d' })
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                isAdmin: user.isAdmin
            }
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}