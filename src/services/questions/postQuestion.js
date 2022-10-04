const db = require('../../models/index');

const Question = db.questions;

const postQuestion = async (question, user) => {
  const { title, body } = question;
  const data = {
    title,
    body,
    userId: user.id
  };

  await Question.create(data);
  return {
    message: 'Question submitted'
  };
};

module.exports = postQuestion;
