const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const User = db.users;
const Answer = db.answers;
const Question = db.questions;

const getAllQuestions = async (id) => {
  const question = await Question.findOne({
    where: { id },
    attributes: { exclude: 'userId' },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    },
    {
      model: Answer,
      include: [{
        model: User,
        as: 'author',
        attributes: ['username']
      }]
    }
    ]
  });
  if (!question) {
    throw new ErrorResponse('not found', 404);
  }

  return {
    question,
    message: 'success'
  };
};

module.exports = getAllQuestions;
