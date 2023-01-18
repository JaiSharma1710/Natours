const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();

//middleware for all the routes in the project.
app.use(express.json());
app.use(morgan('dev'));

//creating our own middleware.
// app.use((req, res, next) => {
//   console.log('hello from middleware');
//   next();
// });

//middleware for a specific route.
app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

module.exports = app;
