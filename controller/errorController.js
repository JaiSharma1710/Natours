const getErrorDev = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    errStack: err.errStack,
  });

const getErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('an unexpected error occured', err);

    res.status(500).json({
      status: 'fail',
      message: 'an error occured',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    getErrorDev(err, res);
  } else {
    getErrorProd(err, res);
  }
};
