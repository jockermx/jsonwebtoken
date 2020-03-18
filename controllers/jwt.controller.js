const jwt = require('jsonwebtoken');
const UserTokenSchema = require('../models/userToken.model.js');
const constants = require('../constants/config.js');

// registrar usuario
exports.signup = async (req, res) => {
    console.log(':::::: signup req: ', req.body);

    //UserTokenSchema.init()
    // Crear UserToken
    const userToken = new UserTokenSchema({
        username: req.body.username || "Untitled UserToken",
        email: req.body.email || "test@test.com.mx",
        password: req.body.password || null
    });
    userToken.password = await userToken.encryptPassword(userToken.password);

    
console.log('-------- userToken: ', userToken);

    // guarda usuario
    userToken.save().then(user => {
        // se genera token basado en el id del usuario
        const token = jwt.sign({id: user._id}, constants.secret, {
            expiresIn: 60 * 60 * 24
        })
        // se envia respuesta
        res.status(200).send({auth: true, token: token});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Ocurrio un error al guardar el usuario."
        });
    });
};

exports.signin = (req, res) => {
    console.log(':::: user getToken: ', req);
    const token = jwt.sign({user}, 'my-secret')
    res.status(200).send(token);
}

// obtiene datos de usuario
exports.getDataToken = (req, res) => {
    // se obtiene el token de la cabecera
    const token = req.headers['x-access-token'];
    // se valida si existe token
    if (!token) {
        return res.status(401).send({
            auth: false,
            message: 'No token provided'
        })
    }

    // se decodifica el token
    const decode = jwt.verify(token, constants.secret)/*.then(res => {
        console.log('**RES: ', res);
    }).catch(err => {
        console.log('**ERROR: ', err);
    });*/
    console.log('::: DECODE: ', decode);

    // se busca el usuario por id
    UserTokenSchema.findById(decode.id, {password: 0}).then(user => {
        console.log(':::: response user: ', user);
        // se valida si obtuvo usuario
        if(!user) {
            return res.status(404).send({
                message: "Usuario no encontrado."
            });            
        }

        // se envia respuesta
        res.status(200).send(user);
    }).catch(err => {
        console.log('::: ERROR: ', err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Usuario no encontrado."
            });                
        }
        return res.status(500).send({
            message: "Error al recuperar el Usuario."
        });
    });
};