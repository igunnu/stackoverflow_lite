const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  acceptAnswer
} = require('../controllers/answer');

router.post('/:answerId/accept', protectedRoute, acceptAnswer);

module.exports = router;
