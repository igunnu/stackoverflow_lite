module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  return Question;
};
