const db = require('../../models/index');

const User = db.users;

const Question = db.questions;

const getAllQuestions = async (req) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 10;
  const offset = page * limit;

  const questions = await Question.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    limit,
    offset,
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
