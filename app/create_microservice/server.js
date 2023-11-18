const mongoose = require('mongoose');
const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_CREATE_DOCKER_PORT, ORIGIN_URL } = process.env;
const app = express()

require('./utils/database')
const User = require('./models/User')

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin: `${ORIGIN_URL}`,
    credentials: true
}));

app.post('/', async (req, res) => {
    try {
        const user = req.body;
        if (!user) {
            return res.status(400).send({ message: "Failed user creation."})
        }
        // Verifico que el usuario no existe
        const user_ = await User.findById(user._id)
        if (user_) {
            return res.status(409).send({ message: "User already exists." })
        }
        const result = await User.create(user)
        res.status(201).send(result)
    } catch (er) {
        res.status(500).send({ message: 'Internal server error' });
    }
})

app.listen(NODE_CREATE_DOCKER_PORT, () => console.log(`Create server listen on port ${NODE_CREATE_DOCKER_PORT}`))