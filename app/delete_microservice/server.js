const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_DELETE_DOCKER_PORT, ORIGIN_URL } = process.env;
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
    methods: ["OPTIONS", "DELETE"],
    credentials: true
}));

app.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id);
        await Image.findByIdAndRemove(req.params.id);
        if (user) {
            console.log(user)
            return res.status(200).send({ current: user });
        }
        return res.status(404).send({ message: "Usuario no encontrado" });
    } catch (err) {
        return res.status(500).send({ message: "Error del servidor" })
    }
})

app.listen(NODE_DELETE_DOCKER_PORT, () => console.log(`Delete server listen on port ${NODE_DELETE_DOCKER_PORT}`))