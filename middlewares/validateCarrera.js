const {param, body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const db = require('../models/index')
const { Op } = require('sequelize')
const { buscarUsuario, validarNombre } = require('./validateAdmin')
const materia = db.sequelize.models.Materia 
const carrera = db.sequelize.models.Carrera 

const buscarMateria = async (id, profesorId) => {
    const materiaAux = await materia.findOne({
        where: {
            [Op.and]: {
                id,
                profesorId
            }
        }
    })

    return materiaAux
}

const buscarCarrera = async (id) => {
    const carreraAux = await carrera.findOne({
        where: {
            id
        }
    })

    return carreraAux
}

const validarExistenciaDeMateria = (atributo) => param(atributo)
                                    .notEmpty()
                                    .custom(async (value, {req}) => {
                                        const materiaAux = await buscarMateria(value, req.uid)
                                        if(!materiaAux) throw new Error('No existe ningún materia con esa ID')
                                    })

const validarExistenciaDeCarrera = (atributo) => body(atributo)
                                    .notEmpty()
                                    .custom(async value => {
                                        const carreraAux = await buscarCarrera(value)
                                        if(!carreraAux) throw new Error('No existe una carrera con esa ID')
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


