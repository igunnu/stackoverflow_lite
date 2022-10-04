const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const Comment = db.comments;

const postComment = async (req) => {
  const { body } = req.body;
  if (!body) {
    throw new ErrorResponse('body is required', 400);
  }

  const data = {
    body,
    userId: req.user.id,
    answerId: req.params.answerId
  };

  await Comment.create(data);
  return {
    message: 'Comment submitted'
  };
};

module.exports = postComment;
