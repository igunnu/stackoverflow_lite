const ErrorResponse = require('../utils/errorResponse');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  if (err.name === 'SequelizeUniqueConstraintError') {
    let message;
    err.errors.forEach((e) => {
      message = `${e.path.split('_')[1]} already exists`;
    });
    error = new ErrorResponse(message, 400);
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = new ErrorResponse('Object not found', 404);
  }

  console.log(err);
  // uncaught error default to 500
  res.status(error.statusCode || 500).json({
    status: 'failed',
    error: error.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
