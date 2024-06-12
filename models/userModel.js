const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =  new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },  
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '',
    },
    genre: {
        type: String,
        default: '',
    }
});

module.exports = mongoose.model('User', UserSchema)