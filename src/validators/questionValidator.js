const Joi = require('joi');
const ErrorResponse = require('../utils/errorResponse');

const schema = Joi.object({
  title: Joi.string()
    .alphanum()
    .min(1)
    .required(),

  body: Joi.string()
    .alphanum()
    .min(1)
    .required()
});

const validateQuestionObject = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ''), 400));
  }
};

module.exports = validateQuestionObject;
