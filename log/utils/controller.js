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

function validateMethod (method, upstream_status) {
    return (method === "POST" && upstream_status === "201") || 
            (method === "GET" && upstream_status === "200") || 
            (method === "PUT" && upstream_status === "200") || 
            (method === "DELETE" && upstream_status === "201")
}

controller.newLog = async (req, res) => {
    try {
        const { body, method } = req.body.request
        const { upstream_status } = req.body
        const user = JSON.parse(body);

        if (validateMethod(method, upstream_status)) {
            const user_ = await User.findById(user._id)
            if (!user_) {
                return res.status(404).send({ message: "User not found" })
            }
            // Realizamos la descripcion
            const values = {
                "POST": ["Escritura", "Creación del usuario por primera vez"],
                "GET": ["Lectura", "Lectura de datos del usuario"], 
                "PUT": ["Actualización", `Actualización de los campos: ${getDistinctValues(user_, user)}`],
                "DELETE": ["Eliminación", "Eliminación permanente del usuario"]
            }

            const [action, description] = values[method]
            const log = { user_id: user._id, action, description }
            result = await Log.create(log)
            return res.status(201).send(log)
        }

        res.status(400).send({ message: "Log not created" })
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}

controller.getLogs = async (req, res) => {
    try {
        const { start, end } = req.params;
        const logs = await Log.aggregate([
            { "$match": req.body },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'usuario',
                },
            },
            {
                $unwind: '$usuario', // Deshace el array creado por $lookup
            },
        ]).skip(start - 1).limit(end - start + 1)
        if (logs) {
            return res.status(200).send(logs)
        }
        res.status(404).send({ message: "There is not logs for this user." })
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}

module.exports = controller