const ApiError = require('./services/apiError');

const express = require('express');
const v1 = require('./routes/v1');

const app = express();

app.use('/v1', v1);

// Catch 404
app.use((req, res, next) => {
  const error = new ApiError('Not found', 404, 'Route not found.');
  next(error);
});

// Catch errors
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  res.status(status).json({ message: message, status: status });
});

module.exports = app;
