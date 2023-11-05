const mongoose = require('mongoose');
const { MONGODB_HOST, MONGODB_DOCKER_PORT, MONGODB_DATABASE } = require('./config')
const MONGODB_URI = `mongodb://${MONGODB_HOST}:${MONGODB_DOCKER_PORT}/${MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Database is connected to", db.connection.host))
    .catch(err => console.log(err))