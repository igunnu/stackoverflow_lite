const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const User = db.users;

const login = async (payload) => {
  const { username, password } = payload;
  if (!username || !password) {
    throw new ErrorResponse('username and password required', 400);
  }
  const user = await User.findOne({
    where: {
      username
    }
  });
  if (!user || !await user.validPassword(password, user.password)) {
    throw new ErrorResponse('username or password incorrect', 400);
  }
  const token = await user.getSignedJwtToken(user.id);
  return {
    message: 'login successful',
    token
  };
};

module.exports = login;
