var express = require('express');
var router = express.Router();
const jwtController = require('../controllers/jwt.controller.js');

// crear token
router.post('/signup', jwtController.signup);

// obtener token
router.post('/signin', jwtController.signin);

// obtener token
router.get('/getDataToken', jwtController.getDataToken);

module.exports = router;
