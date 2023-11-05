const User = require('../models/User')
const controller = {}

controller.getTotalUsers = async (req, res) => {
    const count = await User.find().count()
    if (count) {
        return res.status(200).send({ total: count })
    }
    res.status(404).send({ message: "There is not users." })
}

controller.getUsers = async (req, res) => {
    const { start, end } = req.params;
    const users = await User.find({}).skip(start - 1).limit(end - start + 1)
    if (users) {
        return res.status(200).send(users)
    }
    res.status(404).send({ message: "There is not users." })
}

controller.getUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).send(user)
    } else {
        res.status(400).send({ message: "User not found" })
    }
}

module.exports = controller