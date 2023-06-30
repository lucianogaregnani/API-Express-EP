const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { Op } = require('sequelize')
const { validarAdminIdBody, validarAdminIdParam, validarNombre } = require('./validateAdmin')
const carrera = db.sequelize.models.Carrera 
const instituto = db.sequelize.models.Instituto 

const buscarCarrera = async (id, adminId) => {
    const carreraAux = await carrera.findOne({
        where: {
            [Op.and]: {
                id, adminId
            }
        }
    })

    return carreraAux
}

const buscarInstituto = async (id) => {
    const institutoAux = await instituto.findByPk(id)

    return institutoAux
}

const validarExistenciaDeInstituto = () => body('institutoId')
                                            .notEmpty()
                                            .custom(async value => {
                                                const institutoAux = await buscarInstituto(value)
                                                console.log(institutoAux)
                                                if(!institutoAux) throw new Error('No existe un instituto con ese ID')
                                            })

const validarInsertarCarrera = [
    ...validateAccess('adminInstituto'),
    validarNombre(),
    validarExistenciaDeInstituto(),
    validarAdminIdBody('admincarrera'),
    validateErrors
]

const validarExistenciaDeCarrera = (atributo) => param(atributo)
                                        .notEmpty()
                                        .custom(async value => {
                                            const carreraAux = await buscarCarrera(value)
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
