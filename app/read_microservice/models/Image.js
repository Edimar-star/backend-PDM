const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
    _id: String,
    image: String
})

module.exports = mongoose.model('images', imageSchema);