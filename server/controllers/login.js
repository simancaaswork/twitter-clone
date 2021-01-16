const bcrypt = require('bcryptjs');
const {User} = require('../models/user');

exports.loginUser = async (req, res) => {
  const {email, password} = req.body;
  const user = await User.findOne({email: email});
  if (user) {
    const {password: passwordUser, username} = user;
    const validator = await bcrypt.compare(password, passwordUser);
    if (validator) {
      return res
        .status(200)
        .json({msg: `Hey, ${username}! Welcome back to Tuitah`, data: user});
    } else {
      return res.status(400).json({msg: 'Password incorrect! :c'});
    }
  } else {
    return res.status(400).json({msg: 'User not exists!'});
  }
};
