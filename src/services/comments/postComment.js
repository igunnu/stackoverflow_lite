const db = require('../../models/index');

const Comment = db.comments;

const postComment = async (req) => {
  const { body } = req.body;
  const data = {
    body,
    userId: req.user.id,
    answerId: req.params.answerId
  };

  await Comment.create(data);
  return {
    message: 'comment submitted'
  };
};

module.exports = postComment;
