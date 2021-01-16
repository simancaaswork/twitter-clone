const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

async function connectDB() {
  try {
    await mongoose.connect(process.env.DB_STRING_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('DB connected!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectDB;
