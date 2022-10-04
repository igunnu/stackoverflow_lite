const db = require('../../models/index');

const User = db.users;
const Answer = db.answers;
const { sequelize } = db;

const getAnswers = async (questionId) => {
  const answers = await Answer.findAll({
    where: { questionId },
    attributes: {
      exclude: 'userId',
      include: [
        [
          sequelize.literal('(SELECT SUM(voteValue) FROM VOTES WHERE answerId=answer.id)'), 'vote_count'

        ]
      ]
    },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }],
    raw: true
  });
  return {
    answers,
    message: 'successful'
  };
};

module.exports = getAnswers;
