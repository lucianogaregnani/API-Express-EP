const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { Op } = require('sequelize')
const { buscarUsuario, validarNombre } = require('./validateAdmin')
const materia = db.sequelize.models.Materia 
const user = db.sequelize.models.User 

const buscarMateria = async (id, profesorId) => {
    const materiaAux = await materia.findOne({
        where: {
            [Op.and]: {
                id: value,
                profesorId: req.uid
            }

        }
    })

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
    validarExistenciaDeMateria('materiaId'),
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


