const db = require('../../models/index');

const Comment = db.comments;
const User = db.users;

const getComments = async (req) => {
  const page = req.query.page - 1 || 0;
  const limit = req.query.limit || 10;
  const offset = page * limit;

  const comments = await Comment.findAll({
    where: { answerId: req.params.answerId },
    limit,
    offset,
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
    message: 'success'
  };
};

module.exports = getComments;
