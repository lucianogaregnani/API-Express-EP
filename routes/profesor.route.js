const express = require('express')
const {findAlumnos, findAlumno, actualizarNotas} = require('../controllers/profesor.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validateFindAlumno } = require('../middlewares/validateProfesor')
const router = express.Router()

router.get('/alumnos', validateAccess('Profesor'), findAlumnos)

router.get('/alumno/:id', validateFindAlumno, findAlumno)

router.patch('/notasdeparcial/:id', validateFindAlumno, actualizarNotas)

module.exports = router