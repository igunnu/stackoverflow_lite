const db = require('../models/index');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const User = db.users;
const Question = db.questions;
const Answer = db.answers;

exports.acceptAnswer = asyncHandler(async (req, res, next) => {
  const question = await Question.findOne({ where: { id: req.body.questionId } });
  if (req.user.id !== question.userId) {
    return next(new ErrorResponse('Operation not permitted', 401));
  }
  question.acceptedAnswer = req.params.answerId;
  await question.save();

  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Answer accepted'
    }
  });
});
