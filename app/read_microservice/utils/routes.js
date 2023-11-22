const express = require('express');
const router = express.Router();
const { getUserByfilters, getImage } = require('./controller')

router.get('/:id', getImage)
router.get('/:start/:end', getUserByfilters)

module.exports = router