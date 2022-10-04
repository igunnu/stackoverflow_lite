const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const Answer = db.answers;

const postAnswer = async (body, userId, questionId) => {
  if (!body) {
    throw new ErrorResponse('body is required', 400);
  }

  const data = {
    body,
    userId,
    questionId
  };
  await Answer.create(data);
  return {
    message: 'answer submitted'
  };
};

module.exports = postAnswer;
