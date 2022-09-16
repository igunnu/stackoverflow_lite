const router = require('express').Router();
const { protectedRoute } = require('../middleware/auth');
const { postQuestion, getAllQuestions, getQuestion } = require('../controllers/index');

router.get('/', getAllQuestions);
router.post('/', protectedRoute, postQuestion);
router.get('/:questionId', getQuestion);

module.exports = router;
