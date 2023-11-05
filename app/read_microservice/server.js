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
    origin: `${ORIGIN_URL}`,
    credentials: true
}));

app.get("/getTotalUsers", async (req, res) => {
    const count = await User.find().count()
    if (count) {
        return res.status(200).send({ total: count })
    }
    res.status(404).send({ message: "There is not users." })
})

app.get("/getUsers/:start/:end", async (req, res) => {
    const { start, end } = req.params;
    const users = await User.find({}).skip(start - 1).limit(end - start + 1)
    if (users) {
        return res.status(200).send(users)
    }
    res.status(404).send({ message: "There is not users." })
})

app.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(400).send({ message: "User not found" })
    }
})

app.listen(NODE_READ_DOCKER_PORT, () => console.log(`Read server listen on port ${NODE_READ_DOCKER_PORT}`))