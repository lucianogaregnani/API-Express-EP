const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const router = express.Router()
const { findMateriasAdmin, findMateriaAdmin, asignarMateria, insertarMateria, desasignarMateria, eliminarMateria } = require('../controllers/adminCarrera.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validarFindMateria, validarAsignarMateria, validarInsertarMateria, validarEliminarMateria } = require('../middlewares/validateCarrera')

router.get('/materias', validateAccess('adminCarrera'), findMateriasAdmin)

router.get('/materia/:id', validarFindMateria, findMateriaAdmin)

router.patch('/asignarmateria/:materiaId/:profesorId', validarAsignarMateria, asignarMateria)

router.patch('/desasignarmateria/:id', validarFindMateria, desasignarMateria)

router.post('/insertarmateria', validarInsertarMateria, insertarMateria)

router.delete('/eliminarmateria/:id', validarEliminarMateria, eliminarMateria)

module.exports = router