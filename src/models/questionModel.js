module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    'question',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      acceptedAnswer: {
        type: DataTypes.INTEGER,
        references: {
          model: 'answers',
          key: 'id'
        }
      }
    },
    {
      indexes: [
        {
          type: 'FULLTEXT',
          fields: ['title']
        }
      ]
    }
  );

  return Question;
};
