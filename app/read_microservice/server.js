const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

// Database and server configuration
dotenv.config()
const { NODE_READ_DOCKER_PORT, ORIGIN_URL } = process.env;
require('./utils/database')
const app = express()

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin: `${ORIGIN_URL}`,
    credentials: true
}));

app.use('/', require('./utils/routes'))
app.listen(NODE_READ_DOCKER_PORT, () => console.log(`Read server listen on port ${NODE_READ_DOCKER_PORT}`))