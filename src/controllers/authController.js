const db = require('../models/index');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

const User = db.users;

exports.register = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorResponse('username and Password required', 400));
  }
  const user = await User.create({ username, password });
  const token = await user.getSignedJwtToken(user.id);
  return res.status(201).json({
    status: 'success',
    data: {
      message: 'user created',
      token
    }
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new ErrorResponse('username and Password required', 400));
  }
  const user = await User.findOne({
    where: {
      username
    }
  });
  if (!user || !await user.validPassword(password, user.password)) {
    return next(new ErrorResponse('username or password incorrect', 400));
  }
  const token = user.getSignedJwtToken(user.id);

  return res.status(200).json({
    status: 'success',
    data: {
      message: 'login successful',
      token
    }
  });
});
