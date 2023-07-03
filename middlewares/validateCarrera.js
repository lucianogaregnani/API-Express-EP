const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { buscarUsuario, validarNombre } = require('./validateAdmin')
const { findMateriaAdminQuery } = require('../helpers/findMateriaQuery')
const materia = db.sequelize.models.Materia 

const buscarMateria = async (id, adminId) => {
    const materiaAux = await materia.findByPk(id, findMateriaAdminQuery(adminId))

    return materiaAux
}



const validarExistenciaDeMateria = (atributo) => param(atributo)
                                    .notEmpty()
                                    .custom(async (value, {req}) => {
                                        const materiaAux = await buscarMateria(value, req.uid)
                                        if(!materiaAux) throw new Error('No existe ningún materia con esa ID')
                                    })


const validarFindMateria = [
    ...validateAccess('adminCarrera'),
    validarExistenciaDeMateria('id'),
    validateErrors
]

const validarExistenciaDeProfesorParam = (atributo) => param(atributo)
                                            .notEmpty()
                                            .custom(async value => {
                                                const profesor = await buscarUsuario(value, 'profesor')
                                                if(!profesor) throw new Error('No existe ningún profesor con esa ID')
                                            })

const validarExistenciaDeProfesorBody = (atributo) => body(atributo)
                                            .notEmpty()
                                            .custom(async value => {
                                                const profesor = await buscarUsuario(value, 'profesor')
                                                if(!profesor) throw new Error('No existe ningún profesor con esa ID')
                                            })

const validarAsignarMateria = [
    ...validateAccess('adminCarrera'),
    validarExistenciaDeMateria('materiaId'),
    validarExistenciaDeProfesorParam('profesorId'),
    validateErrors
]

const validarInsertarMateria = [
    ...validateAccess('adminCarrera'),
    validarNombre(),
    validarExistenciaDeProfesorBody('profesorId'),
    validateErrors    
]

const validarEliminarMateria = [
    ...validateAccess('adminCarrera'),
    validarExistenciaDeMateria('id'),
    validateErrors    
]


module.exports = {validarFindMateria, validarAsignarMateria, validarInsertarMateria, validarEliminarMateria,
                validarExistenciaDeMateria}


