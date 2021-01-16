const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/:username', userController.getUserByUsername);
router.put('/:id', userController.updateUserById);

module.exports = router;
