const express = require('express');
const router = express.Router();
const { getTotalUsers, getUsers, getUserById, getUserByfilters } = require('./controller')

router.get("/getTotalUsers", getTotalUsers)
router.get("/getUsers/:start/:end", getUsers)
router.get('/:id', getUserById)
router.get('/:start/:end', getUserByfilters)

module.exports = router