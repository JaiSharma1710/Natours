const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'duration is required'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A max group size is required'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour difficulty is required'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'price is required'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'summary is required'],
  },
  discription: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'tour must have a cover image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', toursSchema);

module.exports = Tour;
