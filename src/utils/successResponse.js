const successresponse = (res, data, statusCode) => res.status(statusCode).json({
  status: 'success',
  data
});

module.exports = successresponse;
