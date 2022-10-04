const db = require('../../models/index');

const User = db.users;

const Question = db.questions;

const getAllQuestions = async () => {
  const questions = await Question.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: { exclude: 'userId' },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }],
    raw: true
  });

  return {
    questions,
    message: 'success'
  };
};

module.exports = getAllQuestions;
