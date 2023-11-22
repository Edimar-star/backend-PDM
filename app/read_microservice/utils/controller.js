const User = require('../models/User')
const Image = require('../models/Image')
const controller = {}

controller.getImage = async (req, res) => {
    try {
        const image = await Image.findById(req.params.id)
        if (image) {
            return res.status(200).send({ current: image })
        }
        return res.status(404).send({ message: "Image not found" })
    } catch (err) {
        return res.status(500).send({ message: "Internal server error" })
    }
}

controller.getUserByfilters = async (req, res) => {
    try {
        const { start, end } = req.params
        const users = await User.find(req.query).skip(start - 1).limit(end - start + 1)
        const total = await User.find(req.query).count()
        if (users.length > 0) {
            return res.status(200).send({ current: { users, total }})
        } else {
            return res.status(404).send({ message: "Users not found" })
        }
    } catch (err) {
        return res.status(500).send({ message: "Internal server error" })
    }
}

module.exports = controller