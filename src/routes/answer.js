const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  acceptAnswer, vote
} = require('../controllers/answer');

router.post('/:answerId/accept', protectedRoute, acceptAnswer);
router.get('/:answerId/vote', protectedRoute, vote);

module.exports = router;
