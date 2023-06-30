const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { Op } = require('sequelize')
const instituto = db.sequelize.models.Instituto  
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
    if(!admin) throw new Error('No existe ningún admin con esa ID')
})

const validarAdminIdParam = (atributo, rol) => param(atributo).notEmpty().custom(async value => {
    const userAux = await buscarUsuario(value, rol)
    if(!userAux) throw new Error('No existe ningún admin con esa ID')
})

const validarInstituto = (atributo) => param(atributo).notEmpty().custom(async value => {
    const institutoAux = await instituto.findOne({
        where: {
            id: value
        }
    })
    if(!institutoAux) throw new Error('No existe ninguna instituto con esa ID')
})

const validarFindInstituto = [
    ...validateAccess('admin'),
    validarInstituto('id'),
    validateErrors
]

const validarEliminarInstituto = [
    ...validateAccess('admin'),
    validarInstituto('id'),
    validateErrors    
]

const validarAsignarAdmin = [
    ...validateAccess('admin'),
    validarAdminIdParam('adminId', 'adminInstituto'),
    validarInstituto('institutoId'),
    validateErrors     
]

const validarDesasignarAdmin = [
    ...validateAccess('admin'),
    validarInstituto('id'),
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