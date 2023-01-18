const dotenv = require('dotenv');
const mongoose = require('mongoose');
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
  .then(() => console.log('connection was successful'));

const port = process.env.PORT || '8000';

app.listen(port, () =>
  console.log(`lisiting on port ${port} on ${process.env.NODE_ENV} environment`)
);
