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
const userController = require('../controllers/userController')
const commentController = require('../controllers/commentController')
const postController = require('../controllers/postController')
const adminController = require('../controllers/adminController')
const upload = require('../middleware/upload')

const router = express.Router();

// admin
router.get('/users', auth, adminController.users)

// auth
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// user profile
router.get('/user/:userId', auth, userController.getUser);

// posts
router.get('/posts', auth, postController.getPosts);
router.post('/posts/create', auth, upload.single('image'), postController.createPost);
router.delete('/posts/delete', auth, postController.deletePost);
router.put('/posts/:postId/like', auth, postController.likePost)
router.put('/posts/:postId/save', auth, postController.savePost)

// comments
router.put('/posts/:postId/comments/create', auth, commentController.createComment)
router.delete('/posts/:postId/comments/delete', auth, commentController.deleteComment)

module.exports = router;
