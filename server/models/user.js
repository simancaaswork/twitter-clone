const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  bio: {
    type: String,
    default: 'New user on Tuitah!',
  },
  location: {
    type: String,
    default: 'Somewhere',
  },
  avatar: {
    type: String,
  },
  dayBorned: String,
  monthBorned: String,
  yearBorned: String,
});

const User = mongoose.model('user', userSchema, 'tuitah_users');
module.exports = {User};
