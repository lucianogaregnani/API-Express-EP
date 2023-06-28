const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const router = express.Router()
const { findMateriasAdmin } = require('../controllers/adminCarrera.controller')

router.get('/materias', requireToken, requireRol('adminCarrera'), findMateriasAdmin)

module.exports = router