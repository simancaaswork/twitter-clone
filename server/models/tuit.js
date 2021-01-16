const mongoose = require('mongoose');

const tuitSchema = mongoose.Schema({
  userId: mongoose.Types.ObjectId,
  text: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
  },
  username: String,
  name: String,
  userAvatar: String,
  answers: {
    type: [Object],
    default: [],
  },
  retuits: {
    type: [Object],
    default: [],
  },
  likes: {
    type: [Object],
    default: [],
  },
});

const Tuit = mongoose.model('tuit', tuitSchema, 'tuitah_tuits');

module.exports = {Tuit};
