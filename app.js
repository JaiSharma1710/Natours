const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/AppError');
const globalAppHandeler = require('./controller/errorController');

const tourRouter = require('./router/tourRouter');
const userRouter = require('./router/userRouter');

const app = express();

//third party middleware
app.use(express.json());
app.use(morgan('dev'));

// creating our own middleware.
// app.use((req, res, next) => {
//   console.log('hello from middleware');
//   next();
// });

//middleware for a specific route.
app.use('/api/v1/tours', tourRouter);

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  //1.SENDING ERROR ON ALL FALTU ROUTES
  //   res.status(404).json({
  //     status: 'fail',
  //     message: `no result found for ${req.originalUrl} on this server`,
  //   });

  //2.THROWING AN ERROR WHICH WILL TO CATCH BY GLOBAL ERROR HANDELER
  //   const err = new Error(
  //     `no result found for ${req.originalUrl} on this server`
  //   );
  //   err.status = 'failed';
  //   err.statusCode = 404;

  //WHENEVER AN ERROR IS PASSED IN NEXT IT WILL ACT AS A SWITCH AND IT WILL DIRECTLY EXICUTE OUR ERROR MIDDLEWARE.
  //   next(err);

  //3. USING A GLOBAL ERROR CLASS
  next(
    new AppError(`no result found for ${req.originalUrl} on this server`, 404)
  );
});

app.use(globalAppHandeler);

module.exports = app;
