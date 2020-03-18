const {Schema, model} = require('mongoose');

const UserSchema = 
    new Schema({
        username: String,
        email: String,
        password: String
    }, {
    timestamps: true
});

module.exports = model('users2', UserSchema);