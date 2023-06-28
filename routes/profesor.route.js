const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const {findAlumnos, findAlumno, actualizarNotas} = require('../controllers/profesor.controller')
const router = express.Router()

router.get('/alumnos', requireToken, requireRol('Profesor'), findAlumnos)

router.get('/alumno/:id', requireToken ,requireRol('Profesor'), findAlumno)

router.patch('/notasdeparcial/:id', requireToken, requireRol('Profesor'), actualizarNotas)

module.exports = router