const express = require('express');
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');
const connectDB = require('./config/db');
const {Tuit} = require('./models/tuit');
const {User} = require('./models/user');

const PORT = process.env.PORT || 4000;

connectDB();
app.use(express.json());
app.use(cors());

app.use('/api/register', require('./routes/register'));
app.use('/api/login', require('./routes/login'));
app.use('/api/tuit', require('./routes/tuit'));
app.use('/api/user', require('./routes/user'));

http.listen(PORT, () => console.log(`Server runing on port: ${PORT}`));

// working with socket for tuits entry
io.on('connection', socket => {
  socket.on('tuitah tuit', async tuitReceived => {
    let tuit = {
      userId: tuitReceived.user._id,
      text: tuitReceived.tuit,
      name: tuitReceived.user.name,
      date: Date.now(),
      username: tuitReceived.user.username,
      userAvatar: tuitReceived.user.avatar,
    };
    const new_tuit = new Tuit(tuit);
    await new_tuit.save();

    // it going to send the tuit to all users
    socket.emit('send tuit to client', new_tuit);
  });

  socket.on('get user tuits', async username => {
    let user_tuits = await Tuit.find({username});
    socket.emit('received user tuits', user_tuits);
  });

  socket.on('get all tuits', async () => {
    const allTuits = await Tuit.find();

    socket.emit('getting all tuits', allTuits);
  });

  socket.on('get users related', async userId => {
    const usersRelated = await User.find();

    const usersExceptUserOnline = usersRelated.filter(
      user => JSON.stringify(user._id) !== JSON.stringify(userId),
    );
    socket.emit('get users related to client', usersExceptUserOnline);
  });

  socket.on('get user updated', async id => {
    const user_updated = await User.findById(id);
    socket.emit('get user updated to client', user_updated);
  });
});
