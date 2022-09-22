const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        },
        beforeUpdate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      },
      indexes: [
        {
          type: 'UNIQUE',
          fields: ['username']
        }
      ]
    }
  );
  User.prototype.validPassword = async (password, hash) => bcrypt.compareSync(password, hash);
  User.prototype.getSignedJwtToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });

  return User;
};
