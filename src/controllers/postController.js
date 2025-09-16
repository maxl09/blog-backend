const mongoose = require('mongoose')
const multer = require('multer')

const Post = require('../models/Post')
const User = require('../models/User')

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('author', 'username profilePic')
            .populate({ path: 'comment', strictPopulate: false, populate: { path: 'author', select: 'username profilePic' } })
            .populate({ path: 'createdAt' })
            .sort({ createdAt: -1 })

        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.createPost = async (req, res) => {
    try {
        // console.log("req.file:", req.file);
        // console.log("req.body:", req.body);
        console.log('req.file:', req.file);
        const { caption } = req.body;
        const userId = req.user.id;

        // const imageUrl = req.file ? `/uploads/${req.file.filename}` : null
        const imageUrl = req.file ? req.file.path : null; // Cloudinary URL

        const post = await Post.create({
            caption,
            image: imageUrl,
            author: userId
        });

        //push post into user's posts array
        await User.findByIdAndUpdate(userId, { $push: { posts: post._id } })

        res.status(201).json(post);
    } catch (error) {
        console.log('createPost controller error: ', error)
        res.status(500).json({ error: error.message })
    }
}

exports.deletePost = async (req, res) => {
    try {
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).json({ error: 'Post ID is required' })
        }
        const deletedPost = await Post.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(400).json({ error: 'Post not found' })
        }
        res.status(200).json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.LikePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId)
        if (!post.likes.includes(userId)) {
            post.likes.push(userId);
        } else {
            post.likes.pull(userId);
        }
        await post.save();

        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.savePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user.saved.includes(postId)) {
            user.saved.push(postId);
        } else {
            user.saved.pull(postId);
        }
        await user.save();
        res.json(user.saved);
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}