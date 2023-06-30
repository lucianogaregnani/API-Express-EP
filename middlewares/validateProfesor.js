const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const { param } = require('express-validator')
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

const validateFindAlumno = [
    validateAccess('Profesor'),
    validarExistenciaDeAlumno(),
    validateErrors
]

module.exports = {validateFindAlumno}