const db = require('../../models/index');

const Comment = db.comments;
const User = db.users;

const getComments = async (req) => {
  const comments = await Comment.findAll({
    where: { answerId: req.params.answerId },
    attributes: {
      exclude: 'userId'
    },
    include: [{
      model: User,
      as: 'author',
      attributes: ['username']
    }]
  });

  return {
    comments,
    message: 'successful'
  };
};

module.exports = getComments;
