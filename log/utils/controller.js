const Log = require('../models/Log')
const User = require('../models/User')
const controller = {}

function getDistinctValues(dict1, dict2) {
    const distinctValues = {};

    // Verificar las llaves en el primer diccionario
    Object.keys(dict1).forEach(key => {
        if (!dict2.hasOwnProperty(key)) {
            distinctValues[key] = dict1[key];
        } else if (dict1[key] !== dict2[key]) {
            distinctValues[key] = dict1[key];
        }
    });

    // Verificar las llaves en el segundo diccionario
    Object.keys(dict2).forEach(key => {
        if (!dict1.hasOwnProperty(key)) {
            distinctValues[key] = dict2[key];
        }
    });

    return Object.keys(distinctValues).join(',');
}

function validateMethod (user, method, upstream_status, upstream_uri) {
    if (upstream_status !== "200") return false
    if ((method === "POST" || method === "PUT") && user) return true
    if ((method === "DELETE" || method === "GET") && upstream_uri) return true

    return false
}

controller.newLog = async (req, res) => {
    const { body, method } = req.body.request
    const { upstream_status, upstream_uri } = req.body
    const user = JSON.parse(body);

    if (validateMethod(user, method, upstream_status, upstream_uri)) {
        const actions = {
            "POST": "Escritura",
            "GET": "Lectura", 
            "PUT": "Actualización",
            "DELETE": "Eliminación"
        }

        const user_ = await User.findById(user._id)
        // Realizamos la descripcion
        const descriptions = {
            "POST": "Creación del usuario por primera vez",
            "GET": "Lectura de datos del usuario",
            "PUT": `Actualización de los campos: ${getDistinctValues(user_, user)}`,
            "DELETE": "Eliminación permanente del usuario"
        }

        const log = { 
            user_id: user._id, 
            action: actions[method],
            description: descriptions[method]
        }

        result = await Log.create(log)
        return res.status(200).send(log)
    }

    res.status(200).send({ message: "Log not created" })
}

controller.getLogs = async (req, res) => {
    const { user_id, start, end } = req.params;
    const logs = await Log.find({ user_id }).skip(start - 1).limit(end - start + 1)
    if (logs) {
        return res.status(200).send(logs)
    }
    res.status(404).send({ message: "There is not logs for this user." })
}

module.exports = controller