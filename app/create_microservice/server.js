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
    const user = req.body;
    if (!user) {
        res.status(400).json({ message: "Failed user creation."})
    }
    const result = await User.create(user)
    res.status(200).json(result)
})

app.listen(NODE_CREATE_DOCKER_PORT, () => console.log(`Create server listen on port ${NODE_CREATE_DOCKER_PORT}`))