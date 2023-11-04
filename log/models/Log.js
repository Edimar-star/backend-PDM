const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    _id: String, // Number of document
    fecha: String,
    accion: String,
    cambio: String
})

module.exports = mongoose.model('log', logSchema);