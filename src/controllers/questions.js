/* eslint-disable no-unused-vars */
const db = require('../models/index');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const User = db.users;
const Question = db.questions;
const Answer = db.answers;
const { sequelize } = db;

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
    data: {
      questions,
      message: 'success'
    }
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
    data: {
      question,
      message: 'success'
    }
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
  /* SELECT
      answers.id,
      body,
      answers.createdAt,
      answers.updatedAt,
      questionId,
      (SELECT SUM(voteValue) FROM VOTES WHERE answerId=answers.id)AS 'vote_count',
      users.username AS 'author'.'username'
      FROM answers
      JOIN users
      ON
        users.id=answers.userId;

  */
  const answers = await Answer.findAll({
    where: { questionId: req.params.questionId },
    attributes: {
      exclude: 'userId',
      include: [
        [
          sequelize.literal('(SELECT SUM(voteValue) FROM VOTES WHERE answerId=answer.id)'), 'vote_count'

        ]
      ]
    },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }]
  });

  return res.status(200).json({
    status: 'success',
    data: {
      answers,
      message: 'successful'
    }
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

exports.searchQuestion = asyncHandler(async (req, res, next) => {
  const { searchQuery } = req.body;
  const [questions] = await sequelize.query(`SELECT * FROM questions  WHERE MATCH(title) AGAINST('${searchQuery}' IN NATURAL LANGUAGE MODE);`);

  return res.status(200).json({
    status: 'success',
    data: {
      questions,
      message: 'success'
    }
  });
});

exports.myQuestions = asyncHandler(async (req, res, next) => {
  const questions = await Question.findAll({
    where: { userId: req.user.id }
  });

  return res.status(200).json({
    status: 'success',
    data: {
      questions,
      message: 'success'
    }
  });
});

exports.mostAnsweredQuestion = asyncHandler(async (req, res, next) => {
  const [question] = await sequelize.query(`SELECT 
                                            questions.id, 
                                            questions.title, 
                                            questions.body, 
                                            questions.acceptedAnswer, 
                                            questions.createdAt, 
                                            questions.updatedAt, 
                                            users.username as author 
                                          FROM questions 
                                          JOIN 
                                            answers 
                                            ON 
                                              answers.questionId = questions.id 
                                          JOIN users 
                                            ON 
                                              questions.userId = users.id 
                                          GROUP BY 
                                            questions.id 
                                          ORDER BY 
                                            COUNT(answers.id) 
                                          DESC
                                          LIMIT 1;`);
  return res.status(200).json({
    status: 'success',
    data: {
      question,
      message: 'success'
    }
  });
});
