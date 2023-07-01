const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { validarAdminIdBody, validarAdminIdParam, validarNombre } = require('./validateAdmin')
const { findCarreraAdminQuery } = require('../helpers/findCarrerasQuery')
const instituto = db.sequelize.models.Instituto 

const buscarCarrera = async (id, adminId) => {
    const carreraAux = await instituto.findOne(findCarreraAdminQuery(adminId, id))
    
    return carreraAux
}

const validarPermisoDesasignarCarrera = async ({req}) => {
    const carrera = await buscarCarrera(req.params.id ,req.uid)

    if(!carrera) throw new Error('No tenes permiso para desasignar esa carrera')
}

const validarInsertarCarrera = [
    ...validateAccess('adminInstituto'),
    validarNombre(),
    validarAdminIdBody('admincarrera'),
    validateErrors
]

const validarExistenciaDeCarrera = (atributo) => param(atributo)
                                        .notEmpty()
                                        .custom(async (value, {req}) => {
                                            const carreraAux = await buscarCarrera(value, req.uid)
                                            if(!carreraAux) throw new Error('No existe ninguna carrera con esa ID')
                                        })

const validarEliminarCarrera = [
    ...validateAccess('adminInstituto'),
    validarExistenciaDeCarrera('id'),
    validateErrors
]

const validarAsignarCarrera = [
    ...validateAccess('adminInstituto'),
    validarExistenciaDeCarrera('carreraId'),
    validarAdminIdParam('adminId', 'adminInstituto'),
    validateErrors
]

const validarDesasignarCarrera = [
    ...validateAccess('adminInstituto'),
    validarAdminIdParam('id', 'adminInstituto'),
    validateErrors    
]

module.exports = {validarInsertarCarrera, validarEliminarCarrera, validarAsignarCarrera, validarDesasignarCarrera}
