const db = require('../models/index');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const Comment = db.comments;
const Question = db.questions;
const Answer = db.answers;
const User = db.users;
const Vote = db.votes;

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

exports.vote = asyncHandler(async (req, res, next) => {
  const voteType = req.query.type;
  const data = {
    userId: req.user.id,
    answerId: req.params.answerId
  };
  try {
    if (voteType === 'upvote') {
      data.voteValue = 1;
      await Vote.create(data);
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'upvote successfull'
        }
      });
    }
    if (voteType === 'downvote') {
      data.voteValue = -1;
      await Vote.create(data);
      return res.status(200).json({
        status: 'success',
        data: {
          message: 'downvote successfull'
        }
      });
    }

    return next(new ErrorResponse('invalid vote type', 400));
  } catch (err) {
    if (err.parent.code === 'ER_DUP_ENTRY') {
      return next(new ErrorResponse('already voted', 400));
    }
    return next(new ErrorResponse('internal server error', 500));
  }
});

exports.postComment = asyncHandler(async (req, res, next) => {
  const { body } = req.body;
  if (!body) {
    return next(new ErrorResponse('body is required', 400));
  }

  const data = {
    body,
    userId: req.user.id,
    answerId: req.params.answerId
  };

  await Comment.create(data);
  return res.status(201).json({
    status: 'success',
    data: {
      message: 'Comment submitted'
    }
  });
});

exports.getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.findAll({
    where: { answerId: req.params.answerId },
    attributes: {
      exclude: 'userId'
    },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }]
  });

  return res.status(201).json({
    status: 'success',
    data: {
      comments,
      message: 'successful'
    }
  });
});
