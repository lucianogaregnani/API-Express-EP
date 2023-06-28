const express = require('express')
const { requireToken, requireRol } = require('../middlewares/requireToken')
const { findCarreras, insertarCarrera, eliminarCarrera, findCarreraAdmin, asignarDirector, desasignarDirector } = require('../controllers/adminInstituto.controller')
const router = express.Router()

router.get('/carreras', requireToken, requireRol('admininstituto'), findCarreras)

router.post('/insertarcarrera', requireToken, requireRol('admininstituto'), insertarCarrera)

router.delete('/eliminarcarrera/:id', requireToken, requireRol('admininstituto'), eliminarCarrera)

router.get('/carrera/:id', requireToken, requireRol('admininstituto'), findCarreraAdmin)

router.patch('/asignarcarrera/:carreraId/:profesorId', requireToken, requireRol('admininstituto'), asignarDirector)

router.patch('/desasignarcarrera/:id', requireToken, requireRol('admininstituto'), desasignarDirector)

module.exports = router