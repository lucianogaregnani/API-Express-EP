const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const router = express.Router()
const { findMateriasAdmin, findMateriaAdmin, asignarMateria, insertarMateria } = require('../controllers/adminCarrera.controller')

router.get('/materias', requireToken, requireRol('adminCarrera'), findMateriasAdmin)

router.get('/materia/:id', requireToken, requireRol('adminCarrera'), findMateriaAdmin)

router.patch('/asignarmateria/:materiaId/:profesorId', requireToken, requireRol('adminCarrera'), asignarMateria)

router.post('/insertarmateria', requireToken, requireRol('adminCarrera'), insertarMateria)

module.exports = router