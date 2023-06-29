const {param} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { Op } = require('sequelize')
const { validarAdminIdBody, validarAdminIdParam, validarNombre } = require('./validateAdmin')
const carrera = db.sequelize.models.Carrera 

const buscarCarrera = async (id, adminId) => {
    const carreraAux = await carrera.findOne({
        where: {
            [Op.and]: {
                id, adminId
            }
        }
    })
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
