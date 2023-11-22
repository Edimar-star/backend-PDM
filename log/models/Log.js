const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    user_id: String,
    date: {
        type: Date,
        default: Date.now
    },
    action: String,
    description: String
})

module.exports = mongoose.model('logs', logSchema);