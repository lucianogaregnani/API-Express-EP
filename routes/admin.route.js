const express = require('express')
const { findInstitutos, findInstituto, insertarInstituto, eliminarInstituto, asignarAdmin, desasignarAdmin } = require('../controllers/admin.controller')
const { validarFindInstituto, validarInsertarInstituto, validarEliminarInstituto, validarAsignarAdmin, validarDesasignarAdmin } = require('../middlewares/validateAdmin')
const { validateAccess } = require('../middlewares/validateUser')
const router = express.Router()

router.get('/institutos', validateAccess('admin'), findInstitutos)

router.get('/instituto/:id', validarFindInstituto, findInstituto)

router.post('/insertarinstituto', validarInsertarInstituto, insertarInstituto)

router.delete('/eliminarinstituto/:id', validarEliminarInstituto, eliminarInstituto)

router.patch('/asignaradmin/:adminId/:carreraId', validarAsignarAdmin, asignarAdmin)

router.patch('/desasignaradmin/:id', validarDesasignarAdmin, desasignarAdmin)

module.exports = router 