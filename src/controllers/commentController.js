const Comment = require('../models/Comment')
const Post = require('../models/Post')

exports.deleteComment = async (req, res) => {
    try {
        const { commentId } = req.body;
        const { postId } = req.params;
        const userId = req.user.id;

        if (!postId || !commentId) {
            return res.status(400).json({ error: 'Post ID and Comment ID is required' })
        }

        const comment = await Comment.findById(commentId)
        if (!comment) {
            return res.status(400).json({ error: 'Comment not found' })
        }
        const post = await Post.findById(postId)
        if (!post) {
            return res.status(400).json({ error: 'Post not found' })
        }
        //Check permission
        if (!req.user.isAdmin && post.author.toString() !== req.user.id) {
            return res.status(403).json({ error: 'You do not have permission to delete this comment' });

        }

        //Delete comment
        await Comment.findByIdAndDelete(commentId);

        //Delete comment from post.comments array
        await Post.findByIdAndUpdate(post, { $pull: { comments: commentId } })

        res.status(200).json({ message: 'Comment deleted successfully' })
        // const comments = await Comment.findByIdAndDelete();

        // const comment = await Comment.create({ text, author: userId, post: postId })
        // await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } }).sort({ createdAt: -1 })

        // res.status(201).json(comment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

exports.createComment = async (req, res) => {
    try {
        const { text, postId } = req.body;
        // const { postId } = req.params;
        const userId = req.user.id;

        const comment = await Comment.create({ text, author: userId, post: postId })
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } })

        const populatedComment = await Comment.findById(comment._id)
            .populate('author', 'username profilePic');
        res.status(201).json(populatedComment)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}