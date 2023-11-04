const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_READ_DOCKER_PORT, ORIGIN_URL } = process.env;
const app = express()

require('./utils/database')
const User = require('./models/User')

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin: "*",
    credentials: true
}));

app.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(400).send(user)
    }
})

app.listen(NODE_READ_DOCKER_PORT, () => console.log(`Read server listen on port ${NODE_READ_DOCKER_PORT}`))