
const express = require('express')
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const path = require('path')
require("dotenv").config();

const app = express()

try {
    // MongoDB connection
    const PORT = process.env.PORT || 5002;
    const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog-page";

    mongoose.connect(MONGO_URI)
        .then(() => console.log('MongoDB connected to', mongoose.connection.name))
        .catch(err => console.error("MongoDB connection error:", err));

    // API middlewares
    app.use(express.json());
    app.use(cors({
        origin: [
            "http://localhost:5173",
            "https://blog-frontend-4cy2.onrender.com"
        ],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    }));


    // Routes
    app.use('/', require('./src/routes'));

    // Static frontend
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get(/^\/(?!).*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
} catch (err) {
    console.error("Server startup error:", err);
}

// app.use(express.json());
// app.use(cors({
//     origin: [
//         "http://localhost:5173",          // dev frontend
//         "https://blog-frontend-mzdu.onrender.com" // deployed frontend
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true
// }));

// // serve uploaded images
// app.use('/uploads', express.static('uploads'));

// app.use('/', require('./src/routes'));

// app.use(express.static(path.join(__dirname, 'dist')))
// // app.use(express.static("/Users/max/Documents/Personal Projects/blog-backend/dist/index.html"))

// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })

// const PORT = process.env.PORT || 5002;
// const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/blog-page";
// // const MONGO_URI = "mongodb://127.0.0.1:27017/blog-page";


// // console.log(__dirname, 'dist', 'index')
// mongoose.connect(MONGO_URI)
//     .then(() => console.log('MongoDB connected to', mongoose.connection.name))
//     .catch(err => console.error("MongoDB connection error:", err));

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
