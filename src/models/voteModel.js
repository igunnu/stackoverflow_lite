module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('vote', {
    voteValue: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id'
      },
      primaryKey: true
    },
    answerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'answers',
        key: 'id'
      },
      primaryKey: true
    }
  });

  return Vote;
};
