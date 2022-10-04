const { acceptAnswer, voteAnswer } = require('../services/answers');
const { postComment, getComments } = require('../services/comments');
const asyncHandler = require('../middleware/async');
const successResponse = require('../utils/successResponse');

exports.acceptAnswer = asyncHandler(async (req, res) => {
  const data = await acceptAnswer(req);
  return successResponse(res, data, 200);
});

exports.vote = asyncHandler(async (req, res) => {
  const data = await voteAnswer(req);
  return successResponse(res, data, 200);
});

exports.postComment = asyncHandler(async (req, res) => {
  const data = await postComment(req);
  return successResponse(res, data, 201);
});

exports.getComments = asyncHandler(async (req, res) => {
  const data = await getComments(req);
  return successResponse(res, data, 200);
});
