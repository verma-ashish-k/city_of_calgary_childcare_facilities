// Error handling middleware
function errorHandler(err, req, res, next) {
  const { status = 500, message = 'Internal Server Error' } = err;
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
