const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    NODE_CREATE_DOCKER_PORT: process.env.NODE_CREATE_DOCKER_PORT,
    MONGODB_HOST: process.env.MONGODB_HOST,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    ORIGIN_URL: process.env.ORIGIN_URL
}