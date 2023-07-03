const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const { param, body } = require('express-validator')
const db = require('../models/index')
const { Op } = require('sequelize')
const nota = db.sequelize.models.Nota 
const materia = db.sequelize.models.Materia 

const buscarMateria = async (profesorId) => {
    const materiaAux = await materia.findOne({
        where: {
            profesorId: profesorId
        }
    })

    if(!materiaAux) throw new Error('No sos profesor de esa materia')

    return materiaAux
}

const buscarNota = async (alumnoId, materiaId) => {
    const notaAux = await nota.findOne({
        where: {
            [Op.and]: {
                alumnoId, materiaId
            }
        }
    })

    return notaAux
}

const validarExistenciaDeAlumno =() => param('id')
                                .notEmpty()
                                .custom(async (value, {req}) => {
                                    const materiaAux = await buscarMateria(req.uid)
                                    const notaAux = await buscarNota(value, materiaAux.id)

                                    if(!notaAux) throw new Error('No existe ese alumno en tu materia')
                                })

const validateNota = (atributo) => body(atributo)
                                .custom(async value => {
                                    console.log(!(parseInt(value) >= 1 && parseInt(value) <= 10))
                                    if(value && !(parseInt(value) >= 1 && parseInt(value) <= 10)) throw new Error('Debe ser un valor entre 1 y 10')
                                })

const validarAsignacionEnMateria = (atributo) => param(atributo).custom(async (value, {req}) => {
                                            const materiaAux = await materia.findOne({
                                                where: {
                                                    [Op.and]:{
                                                        id: value,
                                                        profesorId: req.uid
                                                    }
                                                }
                                            })
                                            
                                            if(!materiaAux) throw new Error('No estas asignado a esa materia')
                                        })

const validarFindMaterias = [
    validateAccess('Profesor'),
    validarAsignacionEnMateria('id'),
    validateErrors
]

const validarActualizacionDeNotas = [
    validateAccess('Profesor'),
    validarExistenciaDeAlumno(),
    validarAsignacionEnMateria('materiaId'),
    validateNota('primerParcial'),
    validateNota('segundoParcial'),
    validateErrors
]

const validateFindAlumno = [
    validateAccess('Profesor'),
    validarExistenciaDeAlumno('materiaId'),
    validateErrors
]

module.exports = {validateFindAlumno, validarActualizacionDeNotas, validarFindMaterias}