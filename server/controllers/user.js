const {User} = require('../models/user');
exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({username: req.params.username});
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({msg: 'User not found'});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).json({msg: 'User Updated!'});
    }
  } catch (error) {
    console.log(error);
  }
};
