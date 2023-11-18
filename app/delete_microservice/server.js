const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_DELETE_DOCKER_PORT, ORIGIN_URL } = process.env;
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

app.delete('/:id', async (req, res) => {
    try {
        const count = await User.findByIdAndRemove(req.params.id);
        if (count > 0) {
            return res.status(204).send({ message: "User deleted" });
        }
        res.status(404).send({ message: "User not found" });
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
})

app.listen(NODE_DELETE_DOCKER_PORT, () => console.log(`Delete server listen on port ${NODE_DELETE_DOCKER_PORT}`))