const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_LOG_DOCKER_PORT, ORIGIN_URL } = process.env;
const app = express()

require('./utils/database')
const Log = require('./models/Log')

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin: "*",
    credentials: true
}));

app.post('/', (req, res) => {
    res.status(200).send(req.body)
})

app.get('/', (req, res) => {
    res.status(200).json(req.body)
})

app.listen(NODE_LOG_DOCKER_PORT, () => console.log(`Log server listen on port ${NODE_LOG_DOCKER_PORT}`))