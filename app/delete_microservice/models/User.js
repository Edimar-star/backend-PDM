const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String, // Number of document
    documentType: String,
    firstName: String,
    middleName: String,
    lastNames: String,
    bornDate: String,
    gender: String,
    email: String,
    phone: String,
    picture: {
        name: String,
        path: String
    }
})

module.exports = mongoose.model('users', userSchema);