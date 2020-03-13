const mongoose = require('mongoose');

const UserTokenSchema =   
    mongoose.Schema({
        _id: String,
        username: String,
        password: String
    });

module.exports = mongoose.model('tokens', UserTokenSchema);