const Comment = require('../models/Comment')
const Post = require('../models/Post')

exports.createComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { postId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.create({ text, author: userId, post: postId })
        await Post.findByIdAndDelete(postId, { $push: { comments: comment._id } })

        res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}