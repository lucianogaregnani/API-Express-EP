const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const findAlumnos = require('../controllers/profesor.controller')
const router = express.Router()

router.get('/alumnos', requireToken, requireRol('Profesor'), findAlumnos)

module.exports = router