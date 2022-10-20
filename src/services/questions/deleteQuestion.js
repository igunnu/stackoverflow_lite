const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const Question = db.questions;

const deleteQuestion = async (questionId, userId) => {
  const question = await Question.findOne({
    where: { id: questionId }
  });

  if (userId !== question.userId) {
    throw new ErrorResponse('operation not permitted', 401);
  }
  await question.destroy();
  return {
    message: 'question deleted'
  };
};

module.exports = deleteQuestion;
