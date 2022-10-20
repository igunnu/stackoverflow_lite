const db = require('../../models/index');

const Answer = db.answers;

const postAnswer = async (body, userId, questionId) => {
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
