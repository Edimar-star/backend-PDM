const express = require('express');
const router = express.Router();
const { getTotalUsers, getUsers, getUserById } = require('./controller')

router.get("/getTotalUsers", getTotalUsers)
router.get("/getUsers/:start/:end", getUsers)
router.get('/:id', getUserById)

module.exports = router