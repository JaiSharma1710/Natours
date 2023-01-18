const Tour = require('../models/tourModels');

// exports.checkRequest = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'bad request',
//       message: 'name and price are needed',
//     });
//   }
//   next();
// };

exports.getToursData = async (req, res) => {
  try {
    const allTourData = await Tour.find();
    res.status(200).json({
      status: 'success',
      data: allTourData,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.postTourData = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(200).json({
      status: 'success',
      data: newTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTourData = async (req, res) => {
  const tour = await Tour.findById(req.params.id);
  try {
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTourData = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: updatedTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTourData = async (req, res) => {
  try {
    const deleteTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: 200,
      data: deleteTour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
