// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require('../models/User')

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    try {
        console.log("Verifying token with secret:", process.env.JWT_SECRET);
        console.log("Token received:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
};

const admin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({ error: 'Admin access only' })
    }
    next();
}

module.exports = { auth, admin };