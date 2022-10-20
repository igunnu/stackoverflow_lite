const db = require('../../models/index');

const User = db.users;

const register = async (payload) => {
  const { username, password } = payload;
  const user = await User.create({ username, password });
  const token = await user.getSignedJwtToken(user.id);

  return {
    token,
    message: 'user registration successfull'
  };
};

module.exports = register;
