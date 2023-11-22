const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_LOG_DOCKER_PORT, ORIGIN_URL } = process.env;
const app = express()

require('./utils/database')

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin: ORIGIN_URL,
    methods: ["OPTIONS", "POST", "GET"],
    credentials: true
}));

app.use('/', require('./utils/routes'))
app.listen(NODE_LOG_DOCKER_PORT, () => console.log(`Log server listen on port ${NODE_LOG_DOCKER_PORT}`))