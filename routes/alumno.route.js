const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const { findMaterias, findMateria, inscribirseAMateria } = require('../controllers/alumno.controller')
const router = express.Router()


router.get('/materias', requireToken, requireRol('Alumno'), findMaterias)

router.get('/materia/:id', requireToken, requireRol('Alumno'), findMateria)

router.post('/inscripcion/:id', requireToken, requireRol('Alumno'), inscribirseAMateria)

module.exports = router