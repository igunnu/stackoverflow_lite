const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const User = db.users;

const register = async (payload) => {
  const { username, password } = payload;
  if (!username || !password) {
    throw new ErrorResponse('username and Password required', 400);
  }
  const user = await User.create({ username, password });
  const token = await user.getSignedJwtToken(user.id);

  return {
    token,
    message: 'user registration successfull'
  };
};

module.exports = register;
