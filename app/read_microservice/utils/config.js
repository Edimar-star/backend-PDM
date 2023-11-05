const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    NODE_READ_DOCKER_PORT: process.env.NODE_READ_DOCKER_PORT,
    MONGODB_HOST: process.env.MONGODB_HOST,
    MONGODB_DOCKER_PORT: process.env.MONGODB_DOCKER_PORT,
    MONGODB_DATABASE: process.env.MONGODB_DATABASE,
    ORIGIN_URL: process.env.ORIGIN_URL
}