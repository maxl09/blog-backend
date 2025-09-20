const Comment = require('../models/Comment')
const Post = require('../models/Post')

// exports.allComments = async (req, res) => {
//     try {
//         const { text, postId } = req.body;
//         // const { postId } = req.params;
//         const userId = req.user.id;

//         const comments = await Comment.find().populate('text author post')

//         // const comment = await Comment.create({ text, author: userId, post: postId })
//         // await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }).sort({ createdAt: -1 })

//         res.status(201).json(comment)
//     } catch (error) {
//         res.status(500).json({ error: error.message })
//     }

// }

exports.createComment = async (req, res) => {
    try {
        const { text, postId } = req.body;
        // const { postId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.create({ text, author: userId, post: postId })
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }).sort({ createdAt: -1 })

        const populatedComment = await Comment.findById(comment._id)
            .populate('author', 'username profilePic');
        res.status(201).json(populatedComment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}