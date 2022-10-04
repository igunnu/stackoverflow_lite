const asyncHandler = require('../middleware/async');
const { login, register } = require('../services/auth');
const successResponse = require('../utils/successResponse');

exports.register = asyncHandler(async (req, res) => {
  const data = await register(req.body);
  return successResponse(res, data, 201);
});

exports.login = asyncHandler(async (req, res) => {
  const data = await login(req.body);
  return successResponse(res, data, 200);
});
