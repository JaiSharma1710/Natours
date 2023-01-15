const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(val);
  if (req.params.id > tours.length - 1)
    return res.status(404).json({
      status: 'not found',
      data: {
        result: 'no tour with the specified id',
      },
    });

  next();
};

exports.checkRequest = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'bad request',
      message: 'name and price are needed',
    });
  }
  next();
};

exports.getToursData = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

exports.postTourData = (req, res) => {
  const newId = tours.at(-1).id + 1;

  const newTour = { ...req.body, id: newId };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) =>
      res.status(201).json({
        status: 'success',
        data: { tour: newTour },
      })
  );
};

exports.getTourData = (req, res) => {
  const requestedTour = tours.find((e) => e.id === +req.params.id);

  res.status(200).json({
    status: 'success',
    data: requestedTour
      ? { tour: requestedTour }
      : { data: 'no tour found for this id' },
  });
};

exports.updateTourData = (req, res) => {
  const requriedTour = {
    ...tours.find((e) => e.id === +req.params.id),
    ...req.body,
  };

  tours.splice(req.params.id, 1, requriedTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) =>
      res.status(201).json({
        status: 'success',
        data: { tour: tours },
      })
  );
};

exports.deleteTourData = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
