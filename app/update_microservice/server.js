const express = require('express')
const morgan = require('morgan')
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
const { NODE_UPDATE_DOCKER_PORT, ORIGIN_URL } = process.env;
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

app.put('/', async (req, res) => {
    await User.findByIdAndUpdate(req.body._id, req.body);
    res.status(200).send({ message: "Update successfull" })
})

app.listen(NODE_UPDATE_DOCKER_PORT, () => console.log(`Update server listen on port ${NODE_UPDATE_DOCKER_PORT}`))