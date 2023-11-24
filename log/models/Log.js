const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

const logSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    action: String,
    description: String,
    user: Object
})

module.exports = mongoose.model('logs', logSchema);