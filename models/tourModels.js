const mongoose = require('mongoose');

const toursSchema = new mongoose.Schema(
  {
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
    slug: String,
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//VIRTUAL FEILDS////////////////////////////////////////////////////////////////////////////////////////////////
//these are vartual feilds not part of our database and can't be used in our db.

// toursSchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7;
// });

// // eslint-disable-next-line prefer-arrow-callback
// toursSchema.virtual('ownerName').get(function () {
//   return 'jai sharma';
// });

//DOCUMENT MIDDLEWARE./////////////////////////////////////////////////////////////////////////////////////////
// WILL ONLY RUN ON CREATE() AND SAVE() METHORDS

// toursSchema.pre('save', function (next) {
//   this.slug = 'this_is_a_test_slug';
//   next();
// });

// toursSchema.post('save', (doc, next) => {
//   // eslint-disable-next-line no-console
//   console.log(doc);
//   next();
// });

//QUERY MIDDLEWARE////////////////////////////////////////////////////////////////////////////////////////////

// toursSchema.pre('find', function (next) {
// toursSchema.pre(/^find/, function (next) {
//   this.find({ duration: { $gte: 5 } });
//   next();
// });

//AGGRIGATION MIDDLEWARE///////////////////////////////////////////////////////////////////////////////////////

// toursSchema.pre('aggregate', function (next) {
//   // eslint-disable-next-line no-console
//   console.log(this, 'hello');
//   next();
// });

// eslint-disable-next-line new-cap
const Tour = new mongoose.model('Tour', toursSchema);

module.exports = Tour;
