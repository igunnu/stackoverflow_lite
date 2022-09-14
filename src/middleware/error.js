const ErrorResponse = require('../utils/errorResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === 'SequelizeUniqueConstraintError') {
    let message;
    err.errors.forEach((e) => {
      message = `${e.path} with value ${e.value} already exists \n`;
    });
    error = new ErrorResponse(message, 400);
  }

  // uncaught error default to 500
  res.status(error.statusCode || 500).json({
    status: 'failed',
    error: error.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
