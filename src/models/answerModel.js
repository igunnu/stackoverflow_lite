module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('answer', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vote_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false
    }
  });

  return Answer;
};
