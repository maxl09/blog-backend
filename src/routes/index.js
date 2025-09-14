// const express = require('express');
// const { deletePost, updatePost, getAllPosts, createPost } = require('../controllers/postsController');
// const router = express.Router();

// router.get('/', getAllPosts);
// router.post('/', createPost);
// router.put('/:id', updatePost);
// router.delete('/:id', deletePost);

// module.exports = router;

const express = require('express')
const { auth, admin } = require('../middleware/auth')
const authController = require('../controllers/authController')
const commentController = require('../controllers/commentController')
const postController = require('../controllers/postController')
const adminController = require('../controllers/adminController')

const router = express.Router();

// admin
router.get('/users', auth, admin, adminController.users)

// auth
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// posts
router.get('/posts', auth, postController.getPosts);
router.post('/posts/create', auth, postController.createPost);
router.put('/posts/:postId/like', auth, postController.LikePost)
router.put('/posts/:postId/save', auth, postController.savePost)

// comments
router.post('/posts/:postId/comments', auth, commentController.createComment)

module.exports = router;
