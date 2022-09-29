const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  acceptAnswer, vote, postComment, getComments
} = require('../controllers/answer');

router.post('/:answerId/accept', protectedRoute, acceptAnswer);
router.get('/:answerId/vote', protectedRoute, vote);
router.post('/:answerId/comment', protectedRoute, postComment);
router.get('/:answerId/comment', getComments);

module.exports = router;
