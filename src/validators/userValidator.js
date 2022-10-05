const Joi = require('joi');
const ErrorResponse = require('../utils/errorResponse');

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required()
});

const validateUserObject = async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.body);
    req.body = value;
    return next();
  } catch (err) {
    return next(new ErrorResponse(err.message.replace(/[\\"]/gi, ''), 400));
  }
};

module.exports = validateUserObject;
