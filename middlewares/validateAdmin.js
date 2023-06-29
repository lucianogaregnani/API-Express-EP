const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { Op } = require('sequelize')
const instituto = db.sequelize.models.Instituto 
const carrera = db.sequelize.models.Carrera 
const user = db.sequelize.models.User 

const buscarUsuario = async (id, rol) => {
    const userAux = await user.findOne({
        where: {
            [Op.and]: {
                rol, id
            }
        }
    })
    return userAux
}

const validarNombre = () => body('nombre', 'El nombre debe tener al menos 5 letras').isLength({min:5})
const validarAdminIdBody = (rol) => body('adminId', 'adminId no puede tener un valor vacio').notEmpty().custom(async value => {
    const admin = await buscarUsuario(value, rol)
    if(!admin) throw new Error('No existe ningún admin de instituto con esa ID')
})

const validarExistenciaDeInstituto = () => param('id').notEmpty().custom(async value => {
    const institutoAux = await instituto.findByPk(value)
    if(!institutoAux) throw new Error('No existe ningún instituto con esa ID')
})

const validarAdminIdParam = (atributo, rol) => param(atributo).notEmpty().custom(async value => {
    const userAux = buscarUsuario(value, rol)
    if(!userAux) throw new Error('No existe ningún admin de instituto con esa ID')
})

const validarCarrera = (atributo) => param(atributo).notEmpty().custom(async (value, {req}) => {
    const carreraAux = await carrera.findOne({
        where: {
            [Op.and]: {
                id: value,
                adminId: req.uid
            }
        }
    })
    if(!carreraAux) throw new Error('No existe ninguna carrera con esa ID')
})

const validarFindInstituto = [
    ...validateAccess('admin'),
    param('id')
        .custom(async value => {
            const institutoAux = await instituto.findByPk(value)
            if(!institutoAux) throw new Error('No existe ningún instituto con esa ID')
        }),
    validateErrors
]

const validarEliminarInstituto = [
    ...validateAccess('admin'),
    validarExistenciaDeInstituto(),
    validateErrors    
]

const validarAsignarAdmin = [
    ...validateAccess('admin'),
    validarAdminIdParam('adminId', 'admin'),
    validarCarrera('carreraId'),
    validateErrors     
]

const validarDesasignarAdmin = [
    ...validateAccess('admin'),
    validarAdminIdParam('id', 'admin'),
    validateErrors    
]

const validarInsertarInstituto = [
    ...validateAccess('admin'),
    validarNombre(),
    validarAdminIdBody('adminInstituto'),
    validateErrors
]

module.exports = {validarFindInstituto, validarInsertarInstituto, 
                validarEliminarInstituto, validarAsignarAdmin, validarDesasignarAdmin, 
                buscarUsuario, validarNombre, validarAdminIdBody, validarAdminIdParam}