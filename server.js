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
  })
  .then(() => console.log('connection was successful'));

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
});

const Tour = new mongoose.model('Tour', toursSchema);

// const testTour = new Tour({
//   name: 'jai',
//   rating: 5,
//   price: 200,
// });

// testTour.save().then((res) => console.log(res));

const port = process.env.PORT || '8000';

app.listen(port, () =>
  console.log(`lisiting on port ${port} on ${process.env.NODE_ENV} environment`)
);
