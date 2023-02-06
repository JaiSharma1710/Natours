const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.log(
    `An error occured of type ${err.name}, {ERROR => ${err.message}}`
  );
  process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DB_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  // eslint-disable-next-line no-console
  .then(() => console.log('connection was successful'));

const port = process.env.PORT || '8000';

const server = app.listen(port, () =>
  // eslint-disable-next-line no-console
  console.log(`lisiting on port ${port} on ${process.env.NODE_ENV} environment`)
);

process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(
    `An error occured of type ${err.name}, {ERROR => ${err.message}}`
  );

  server.close(() => process.exit(1));
});
