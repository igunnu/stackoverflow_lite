const db = require('../../models/index');

const Question = db.questions;

const myQuestions = async (userId) => {
  const questions = await Question.findAll({
    where: { userId }
  });

  return {
    questions,
    message: 'success'
  };
};

module.exports = myQuestions;
