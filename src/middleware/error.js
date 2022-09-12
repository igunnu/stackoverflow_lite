// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const error = { ...err };
  error.message = err.message;

  // uncaught error default to 500
  res.status(error.statusCode || 500).json({
    status: 'failed',
    error: error.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
