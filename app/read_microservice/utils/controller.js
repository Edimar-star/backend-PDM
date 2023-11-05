const User = require('../models/User')
const controller = {}

controller.getTotalUsers = async (req, res) => {
    try {
        const count = await User.find().count()
        if (count) {
            return res.status(200).send({ total: count })
        }
        res.status(404).send({ message: "There is not users." })
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}

controller.getUsers = async (req, res) => {
    try {
        const { start, end } = req.params;
        const users = await User.find().skip(start - 1).limit(end - start + 1)
        if (users) {
            return res.status(200).send(users)
        }
        res.status(404).send({ message: "There is not users." })
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}

controller.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            return res.status(200).send(user)
        }
        res.status(404).send({ message: "User not found" })
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}

controller.getUserByfilters = async (req, res) => {
    try {
        const { start, end } = req.params;
        const users = await User.find(req.body).skip(start - 1).limit(end - start + 1)
        if (users) {
            res.status(200).send(users)
        } else {
            res.status(404).send({ message: "Users not found" })
        }
    } catch (err) {
        res.status(500).send({ message: "Internal server error" })
    }
}

module.exports = controller