module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Answer;
};
