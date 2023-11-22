const Log = require('../models/Log')
const controller = {}

function getDistinctValues(dict1, dict2) {
    const distinctValues = {};

    // Verificar las llaves en el primer diccionario
    Object.keys(dict1).forEach(key => {
        if (!dict2.hasOwnProperty(key)) {
            distinctValues[key] = [dict1[key], ""]
        } else if (dict1[key] !== dict2[key]) {
            distinctValues[key] = [dict1[key], dict2[key]]
        }
    });

    // Verificar las llaves en el segundo diccionario
    Object.keys(dict2).forEach(key => {
        if (!dict1.hasOwnProperty(key)) {
            distinctValues[key] = ["", dict2[key]]
        }
    });

    return Object.keys(distinctValues).join(',');
}

function validateMethod (method, upstream_status) {
    return (method == "POST" && upstream_status < 300) || 
            (method == "GET" && upstream_status < 400) || 
            (method == "PUT" && upstream_status < 300) || 
            (method == "DELETE" && upstream_status < 300)
}

const createLog = async (current, before, method) => {
    const values = {
        "POST": ["Escritura", "Creación del usuario por primera vez"],
        "GET": ["Lectura", "Lectura de datos del usuario"], 
        "PUT": ["Actualización", getDistinctValues(before, current).toString()],
        "DELETE": ["Eliminación", "Eliminación permanente del usuario"]
    }

    const [action, description] = values[method]
    const log = { user_id: current._id, action, description }
    result = await Log.create(log)
}

controller.newLog = async (req, res) => {
    try {
        const method = req.body.request.method
        const upstream_status = req.body.response.status

        if (validateMethod(method, upstream_status)) {
            const { current, before } = JSON.parse(req.body.response.body)
            if (method == "POST") {
                createLog(current, {}, method)
            } else if (method == "PUT") {
                createLog(current, before, method)
            } else if(method == "DELETE") {
                createLog(current, {}, method)
            } else if (method == "GET" && !current.users) {
                createLog(current, {}, method)
            } else if (method == "GET" && current.users) {
                current.users.forEach(user => createLog(user, {}, method))
            }
            
            return res.status(201).send("Log created")
        }

        return res.status(200).send({ message: "Log not created" })
    } catch (err) {
        return res.status(200).send({ message: "Internal server error" })
    }
}

controller.getLogs = async (req, res) => {
    try {
        const { start, end } = req.params;
        const logs = await Log.find(req.query).skip(start - 1).limit(end - start + 1)
        const total = await Log.find(req.query).count()
        if (logs.length > 0) {
            return res.status(200).send({ logs, total })
        }
        return res.status(404).send({ message: "There is not logs for this user." })
    } catch (err) {
        return res.status(500).send({ message: "Internal server error" })
    }
}

module.exports = controller