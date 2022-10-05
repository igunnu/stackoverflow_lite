const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const {
  postQuestion,
  getAllQuestions,
  getQuestion,
  postAnswer,
  getAnswers,
  deleteQuestion,
  searchQuestion,
  myQuestions,
  mostAnsweredQuestion
} = require('../controllers/questions');
const validateQuestionObject = require('../validators/questionValidator');
const validateSearchObject = require('../validators/searchValidator');
const validateAnswerObject = require('../validators/answerValidator');

router.get('/', getAllQuestions);
router.post('/', validateQuestionObject, protectedRoute, postQuestion);
router.get('/me', protectedRoute, myQuestions);
router.get('/top', mostAnsweredQuestion);
router.post('/search', validateSearchObject, searchQuestion);
router.get('/:questionId', getQuestion);
router.post('/:questionId/answers', validateAnswerObject, protectedRoute, postAnswer);
router.get('/:questionId/answers', getAnswers);
router.delete('/:questionId', protectedRoute, deleteQuestion);

module.exports = router;
