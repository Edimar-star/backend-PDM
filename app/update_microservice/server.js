const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_UPDATE_DOCKER_PORT, ORIGIN_URL } = process.env;
const app = express()

require('./utils/database')
const User = require('./models/User')
const Image = require('./models/Image')

//Configuracion
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'));
app.use(cors({
    origin: ORIGIN_URL,
    methods: ["OPTIONS", "PUT"],
    credentials: true
}));

app.put('/', async (req, res) => {
    try {
        const { user, picture } = req.body
        const before = await User.findByIdAndUpdate(user._id, user);
        await Image.findByIdAndUpdate(picture._id, picture)
        if (!current) {
            res.status(404).send({ message: "Usuario no encontrado" })
        }
        return res.status(200).send({ before, current: user })
    } catch (err) {
        return res.status(500).send({ message: "Error del servidor" })
    }
})

app.listen(NODE_UPDATE_DOCKER_PORT, () => console.log(`Update server listen on port ${NODE_UPDATE_DOCKER_PORT}`))