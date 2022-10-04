/* eslint-disable no-unused-vars */
const {
  deleteQuestion,
  getAllQuestions,
  getQuestion,
  postQuestion,
  searchQuestion,
  topQuestion,
  myQuestions
} = require('../services/questions');
const { postAnswer, getAnswers } = require('../services/answers');
const asyncHandler = require('../middleware/async');
const successResponse = require('../utils/successResponse');

exports.postQuestion = asyncHandler(async (req, res) => {
  const data = await postQuestion(req.body, req.user);
  return successResponse(res, data, 201);
});

exports.getAllQuestions = asyncHandler(async (req, res) => {
  const data = await getAllQuestions();
  return successResponse(res, data, 200);
});

exports.getQuestion = asyncHandler(async (req, res) => {
  const data = await getQuestion(req.params.questionId);
  return successResponse(res, data, 200);
});

exports.postAnswer = asyncHandler(async (req, res) => {
  const data = await postAnswer(req.body.body, req.user.id, req.params.questionId);
  return successResponse(res, data, 201);
});

exports.getAnswers = asyncHandler(async (req, res) => {
  const data = await getAnswers(req.params.questionId);
  return successResponse(res, data, 200);
});

exports.deleteQuestion = asyncHandler(async (req, res) => {
  const data = await deleteQuestion(req.params.questionId, req.user.id);
  return successResponse(res, data, 200);
});

exports.searchQuestion = asyncHandler(async (req, res) => {
  const data = await searchQuestion(req.body);
  return successResponse(res, data, 200);
});

exports.myQuestions = asyncHandler(async (req, res) => {
  const data = await myQuestions(req.user.id);
  return successResponse(res, data, 200);
});

exports.mostAnsweredQuestion = asyncHandler(async (req, res) => {
  const data = await topQuestion();
  return successResponse(res, data, 200);
});
