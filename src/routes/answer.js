const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  acceptAnswer, vote, postComment, getComments
} = require('../controllers/answer');
const validateCommentObject = require('../validators/commentValidator');
const validateQuery = require('../validators/queryValidator');

router.post('/:answerId/accept', protectedRoute, acceptAnswer);
router.get('/:answerId/vote', protectedRoute, vote);
router.post('/:answerId/comment', validateCommentObject, protectedRoute, postComment);
router.get('/:answerId/comment', validateQuery, getComments);

module.exports = router;
