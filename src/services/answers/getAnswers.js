const db = require('../../models/index');

const User = db.users;
const Answer = db.answers;
const { sequelize } = db;

const getAnswers = async (req) => {
  const { questionId } = req.params;
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 10;
  const offset = page * limit;
  const answers = await Answer.findAll({
    where: { questionId },
    limit,
    offset,
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
    message: 'success'
  };
};

module.exports = getAnswers;
