const db = require('../../models/index');
const ErrorResponse = require('../../utils/errorResponse');

const Vote = db.votes;

const voteAnswer = async (req) => {
  const voteType = req.query.type;
  const data = {
    userId: req.user.id,
    answerId: req.params.answerId
  };
  try {
    if (voteType === 'upvote') {
      data.voteValue = 1;
      await Vote.create(data);
      return {
        message: 'upvote successfull'
      };
    }
    if (voteType === 'downvote') {
      data.voteValue = -1;
      await Vote.create(data);
      return {
        message: 'downvote successfull'
      };
    }
  } catch (err) {
    if (err.parent.code === 'ER_DUP_ENTRY') {
      throw new ErrorResponse('already voted', 400);
    }
    throw new ErrorResponse('internal server error', 500);
  }
  throw new ErrorResponse('invalid vote type', 400);
};
module.exports = voteAnswer;
