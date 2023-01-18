const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../models/tourModels');

dotenv.config({ path: '../config.env' });

const DB = process.env.DB_STRING.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connection was successful'));

//add data to db

const addDataToDB = async () => {
  try {
    const data = JSON.parse(
      fs.readFileSync('./data/tours-simple.json', 'utf-8')
    );
    await Tour.create(data);
    console.log('tour data entered');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteDataFromDB = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  addDataToDB();
} else if (process.argv[2] === '--delete') {
  deleteDataFromDB();
}
