const {User} = require('../models/user');
const bcrypt = require('bcryptjs');
const shortid = require('shortid');

exports.createUser = async (req, res) => {
  let {email, password, username} = req.body;
  const userExistsByEmail = await User.findOne({email: email});
  if (userExistsByEmail) {
    return res
      .status(400)
      .json({msg: 'Email already taken. Try with other email'});
  }

  const userExistsByUsername = await User.findOne({username: username});
  if (userExistsByUsername) {
    return res
      .status(400)
      .json({msg: 'Username already taken. Try with other username'});
  }

  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);

  req.body.password = password;

  function getImageProfile(min, max) {
    let imagesProfile = [
      'https://hopeful-lovelace-f3ed48.netlify.app/static/media/1.ed104069.jpg',
      'https://hopeful-lovelace-f3ed48.netlify.app/static/media/2.429f9492.jpg',
      'https://hopeful-lovelace-f3ed48.netlify.app/static/media/3.16f7eac9.jpg',
      'https://hopeful-lovelace-f3ed48.netlify.app/static/media/4.5b5b8f9d.jpg',
    ];

    let selectImage = Math.floor(Math.random() * (max - min) + min);
    let image = imagesProfile[selectImage];
    return image;
  }
  req.body.avatar = getImageProfile(0, 4);

  const new_user = new User(req.body);
  await new_user.save();
  return res.status(200).json({msg: 'Welcome to Tuitah!', data: new_user});
};
