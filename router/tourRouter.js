const express = require('express');

const tourController = require('../controller/toursController');

const router = express.Router();

// router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getToursData)
  .post(tourController.postTourData);

router
  .route('/:id')
  .get(tourController.getTourData)
  .patch(tourController.updateTourData)
  .delete(tourController.deleteTourData);

module.exports = router;
