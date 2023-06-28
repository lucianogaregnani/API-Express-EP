const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const router = express.Router()
const { findMateriasAdmin, findMateriaAdmin, asignarMateria, insertarMateria, desasignarMateria, eliminarMateria } = require('../controllers/adminCarrera.controller')

router.get('/materias', requireToken, requireRol('adminCarrera'), findMateriasAdmin)

router.get('/materia/:id', requireToken, requireRol('adminCarrera'), findMateriaAdmin)

router.patch('/asignarmateria/:materiaId/:profesorId', requireToken, requireRol('adminCarrera'), asignarMateria)

router.patch('/desasignarmateria/:id', requireToken, requireRol('adminCarrera'), desasignarMateria)

router.post('/insertarmateria', requireToken, requireRol('adminCarrera'), insertarMateria)

router.delete('/eliminarmateria/:id', requireToken, requireRol('adminCarrera'), eliminarMateria)


module.exports = router