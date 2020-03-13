var express = require('express');
var router = express.Router();
const userTokenController = require('../controllers/jwt.controller.js');
const usersController = require('../controllers/users.controller.js');

// crear token
router.post('/new', userTokenController.create);

// obtener token
router.post('/getToken', usersController.findOne, userTokenController.getToken);

module.exports = router;
