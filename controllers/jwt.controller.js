const jwt = require('jsonwebtoken')
const UserToken = require('../models/userToken.model.js')
const userController = require('./users.controller.js')

// Create and Save a new product
exports.create = (req, res) => {
    console.log(':::::: req: ', req.body);

    // Create a UserToken
    const userToken = new UserToken({
        username: req.body.username || "Untitled UserToken", 
        password: req.body.password || 0
    });

    // Save UserToken in the database
    userToken.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al guardar el UserToken."
        });
    });
};

exports.getToken = (req, res) => {
    const token = jwt.sign({user}, 'my-secret')
    res.status(200).send(token);
}

// buscar un usuario
/*exports.findOne = (req, res) => {
    console.log('--->>> GET TOKEN POST: ' + req.body.username + ' - ' + req.body.password);
    UserToken.findOne({username: req.body.username}).then(userToken => {
        console.log(':::: userToken: ', userToken);
        if(!userToken) {
            return res.status(404).send({
                message: "UserToken no encontrado con el username: " + req.body.username
            });            
        }
        res.send(userToken);
    }).catch(err => {
        console.log('::: ERROR: ', err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "UserToken no encontrado con el username: " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Error al recuperar el UserToken con el username " + req.params.username
        });
    });
};*/