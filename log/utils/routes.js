const express = require('express');
const router = express.Router();
const { newLog, getLogs } = require('./controller')

router.post('/', newLog)
router.get('/:start/:end', getLogs)

module.exports = router