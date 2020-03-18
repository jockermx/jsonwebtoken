const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');

const UserTokenSchema =   
    new Schema({
        username: String,
        email: String,
        password: String
    }, {
    timestamps: true
});

UserTokenSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

module.exports = model('users', UserTokenSchema);