const express = require('express')
const { findCarreras, insertarCarrera, eliminarCarrera, findCarreraAdmin, asignarAdministrador, desasignarAdministrador } = require('../controllers/adminInstituto.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validarInsertarCarrera, validarEliminarCarrera, validarDesasignarCarrera, validarAsignarCarrera } = require('../middlewares/validateInstituto')
const router = express.Router()

router.get('/carreras', validateAccess('adminInstituto'), findCarreras)

router.post('/insertarcarrera', validarInsertarCarrera, insertarCarrera)

router.delete('/eliminarcarrera/:id', validarEliminarCarrera, eliminarCarrera)

router.get('/carrera/:id', validarEliminarCarrera, findCarreraAdmin)

router.patch('/asignarcarrera/:carreraId/:adminId', validarAsignarCarrera, asignarAdministrador)

router.patch('/desasignarcarrera/:id', validarDesasignarCarrera, desasignarAdministrador)

module.exports = router