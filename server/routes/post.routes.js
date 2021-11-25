const router = require('express').Router();
const postController = require('../controllers/post.controller');
const {checkUser, requireAuth} = require('../middleware/auth.middleware');
const multer = require("multer");
const upload = multer();

router.get('/', requireAuth, postController.readPost);
//router.post('/contains', requireAuth, postController.findPostByWord);
router.route('/contains')
  .post(requireAuth, postController.findPostByWord)
  .post(requireAuth, postController.findPostByType);
router.post('/', requireAuth, upload.single("file"), postController.createPost);
router.put('/:id', requireAuth, postController.updatePost);
router.patch('/like-post/:id', requireAuth, postController.likePost);
router.patch('/unlike-post/:id', requireAuth, postController.unlikePost);
router.delete('/:id', requireAuth, postController.deletePost);

// comments
router.patch('/comment-post/:id', requireAuth, postController.commentPost);
router.patch('/edit-comment-post/:id', requireAuth, postController.editCommentPost);
router.patch('/delete-comment-post/:id', requireAuth, postController.deleteCommentPost);

module.exports = router;