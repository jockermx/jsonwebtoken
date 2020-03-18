var express = require('express');
var router = express.Router();
const userController = require('../controllers/users.controller.js');

// crear usuario
router.post('/add', userController.create);

// actualizar usuario por userId
router.put('/users/:userId', userController.update);

module.exports = router;
