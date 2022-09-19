const db = require('../models/index');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const User = db.users;
const Question = db.questions;
const Answer = db.answers;

exports.postQuestion = asyncHandler(async (req, res, next) => {
  const { title, body } = req.body;
  const data = {
    title,
    body,
    userId: req.user.id
  };

  await Question.create(data);
  return res.status(201).json({
    status: 'success',
    data: {
      message: 'Question submitted'
    }
  });
});

exports.getAllQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: { exclude: 'userId' },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }]
  });

  return res.status(200).json({
    status: 'success',
    data: questions
  });
});

exports.getQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findOne({
    where: { id: req.params.questionId },
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
    return next(new ErrorResponse('not found', 404));
  }
  return res.status(200).json({
    status: 'success',
    data: question
  });
});

exports.postAnswer = asyncHandler(async (req, res, next) => {
  const { body } = req.body;
  if (!body) {
    return next(new ErrorResponse('body is required', 400));
  }

  const data = {
    body,
    userId: req.user.id,
    questionId: req.params.questionId
  };

  await Answer.create(data);
  return res.status(201).json({
    status: 'success',
    data: {
      message: 'Answer submitted'
    }
  });
});

exports.getAnswers = asyncHandler(async (req, res, next) => {
  const answers = await Answer.findAll({
    where: { questionId: req.params.questionId },
    attributes: { exclude: 'userId' },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }]
  });

  return res.status(200).json({
    status: 'success',
    data: answers
  });
});

exports.deleteQuestion = asyncHandler(async (req, res, next) => {
  const question = await Question.findOne({
    where: { id: req.params.questionId }
  });

  if (req.user.id !== question.userId) {
    return next(new ErrorResponse('Operation not permitted', 401));
  }
  await question.destroy();

  return res.status(200).json({
    status: 'success',
    data: {
      message: 'Question deleted'
    }
  });
});


