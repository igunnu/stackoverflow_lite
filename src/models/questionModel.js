module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('question', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Question;
};
