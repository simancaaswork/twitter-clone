const router = require('express').Router();
const tuitController = require('../controllers/tuit');

router.get('/:tuitId', tuitController.getTuitById);

module.exports = router;
