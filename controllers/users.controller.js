const User = require('../models/user.model.js');

// Create and Save a new product
exports.create = (req, res) => {
    console.log(':::::: create user req: ', req.body);

    // Create a User
    const user = new User({
        username: req.body.username || "Untitle user", 
        password: req.body.password || undefined
    });

    // Save user in the database
    user.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al guardar el user."
        });
    });
};

// buscar un usuario
exports.findOne = (req, res) => {
    console.log('--->>> findOne user: ' + req.body.username + ' - ' + req.body.password);
    User.findOne({username: req.body.username}).then(user => {
        console.log(':::: user: ', user);
        if(!user) {
            return res.status(404).send({
                message: "Usuario no encontrado con el username: " + req.body.username
            });            
        }
        res.send(user);
    }).catch(err => {
        console.log('::: ERROR: ', err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con el username: " + req.params.username
            });                
        }
        return res.status(500).send({
            message: "Error al recuperar el usuario con el username " + req.params.username
        });
    });
};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.userId) {
        return res.status(400).send({
            message: "El identificador del Usuario no puede estar vacio."
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.userId, {
        usename: req.body.username || "Untitle user",
        password: req.body.password || undefined
    }, {new: true}).then(user => {
        if(!user) {
            return res.status(404).send({
                message: "Usuario no encontrado con el id " + req.params.userId
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado con el id " + req.params.userId
            });                
        }
        return res.status(500).send({
            message: "Error al actualizar el usuario con el id " + req.params.userId
        });
    });
};