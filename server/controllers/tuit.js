const {Tuit} = require('../models/tuit');

exports.getTuitById = async (req, res) => {
  try {
    const tuit = await Tuit.findById(req.params.tuitId);
    return res.status(200).json(tuit);
  } catch (error) {
    console.log(error);
  }
};
