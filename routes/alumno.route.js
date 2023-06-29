const express = require('express')
const { findMaterias, findMateria, inscribirseAMateria, darseDeBaja } = require('../controllers/alumno.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validarFindMateria } = require('../middlewares/validateCarrera')
const router = express.Router()

router.get('/materias', validateAccess('alumno'), findMaterias)

router.get('/materia/:id', validarFindMateria, findMateria)

router.post('/inscripcion/:id', validarFindMateria, inscribirseAMateria)

router.delete('/baja/:id', validarFindMateria, darseDeBaja)

module.exports = router