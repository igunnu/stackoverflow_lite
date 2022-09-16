/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');
const authRoute = require('./routes/authRoute');
const indexRoute = require('./routes/index');
require('dotenv').config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/questions', indexRoute);

app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// eslint-disable-next-line no-console
app.listen(PORT, console.log(`server is running on port ${PORT}`));
