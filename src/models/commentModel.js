module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comment', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Comment;
};
