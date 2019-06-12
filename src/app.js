const ApiError = require('./services/apiError');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const v1 = require('./routes/v1');
const io = require('./server');

const app = express();

app.use((req, res, next) => {
  req.io = io;

  next();
});

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

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
