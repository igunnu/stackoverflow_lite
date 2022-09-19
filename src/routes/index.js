const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  postQuestion, getAllQuestions, getQuestion, postAnswer, getAnswers, deleteQuestion
} = require('../controllers/index');

router.get('/', getAllQuestions);
router.post('/', protectedRoute, postQuestion);
router.get('/:questionId', getQuestion);
router.post('/:questionId/answers', protectedRoute, postAnswer);
router.get('/:questionId/answers', getAnswers);
router.delete('/:questionId', protectedRoute, deleteQuestion);

module.exports = router;
