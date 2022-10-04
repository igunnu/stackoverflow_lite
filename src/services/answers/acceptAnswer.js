const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const Question = db.questions;

const acceptAnswer = async (req) => {
  const question = await Question.findOne({ where: { id: req.body.questionId } });
  if (req.user.id !== question.userId) {
    throw new ErrorResponse('Operation not permitted', 401);
  }
  question.acceptedAnswer = req.params.answerId;
  await question.save();

  return {
    message: 'Answer accepted'
  };
};

module.exports = acceptAnswer;
