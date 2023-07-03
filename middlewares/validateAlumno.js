const { param } = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const { validarExistenciaDeMateria } = require('./validateCarrera')
const db = require('../models/index')
const { Op } = require('sequelize')
const materia = db.sequelize.models.Materia 
const nota = db.sequelize.models.Nota 

const validarExistencia = () => param('id')
                                        .custom(async value => {
                                            const materiaAux = await materia.findByPk(value)
                                            if(!materiaAux) throw new Error('No existe una materia con esa ID')
                                        })

const validarInscripcionAMateria = () => param('id')
                                        .custom(async (value, {req}) => {
                                            const materiaAux = await nota.findOne({
                                                where: {
                                                    [Op.and]: {
                                                        materiaId: value,
                                                        alumnoId: req.uid
                                                    }
                                                }
                                            })
                                            if(!materiaAux) throw new Error('No estas inscripto en una materia con esa ID')
                                        })

const validarFindMateria = [
    validateAccess('alumno'),
    validarExistencia(),
    validateErrors
]

const validarFindMateriaInscripta = [
    validateAccess('alumno'),
    validarInscripcionAMateria(),
    validateErrors
]

module.exports = {validarFindMateria, validarFindMateriaInscripta}