const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  postQuestion, getAllQuestions, getQuestion, postAnswer, getAnswers, deleteQuestion,searchQuestion
} = require('../controllers/questions');

router.get('/', getAllQuestions);
router.post('/', protectedRoute, postQuestion);
router.post('/search', searchQuestion);
router.get('/:questionId', getQuestion);
router.post('/:questionId/answers', protectedRoute, postAnswer);
router.get('/:questionId/answers', getAnswers);
router.delete('/:questionId', protectedRoute, deleteQuestion);

module.exports = router;
