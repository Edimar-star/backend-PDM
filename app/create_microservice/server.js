const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_CREATE_DOCKER_PORT, ORIGIN_URL } = process.env;
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
    methods: ["OPTIONS", "POST"],
    credentials: true
}));

app.post('/', async (req, res) => {
    try {
        const { user, picture } = req.body;
        if (!user) {
            return res.status(400).send({ message: "Error al crear el usuario"})
        }
        // Verifico que el usuario no existe
        const user_ = await User.findById(user._id)
        if (user_) {
            return res.status(409).send({ message: "El usuario ya existe" })
        }
        const current = await User.create(user)
        await Image.create(picture)
        return res.status(201).send({ current })
    } catch (er) {
        return res.status(500).send({ message: 'Error del servidor' });
    }
})

app.listen(NODE_CREATE_DOCKER_PORT, () => console.log(`Create server listen on port ${NODE_CREATE_DOCKER_PORT}`))