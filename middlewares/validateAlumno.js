const { param } = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const { validarExistenciaDeMateria } = require('./validateCarrera')
const db = require('../models/index')
const materia = db.sequelize.models.Materia 

const validarExistencia = () => param('id')
                                        .custom(async value => {
                                            const materiaAux = await materia.findByPk(value)
                                            if(!materiaAux) throw new Error('No existe una materia con esa ID')
                                        })

const validarFindMateria = [
    validateAccess('alumno'),
    validarExistencia(),
    validateErrors
]

const validarFindMateriaInscripta = [
    validateAccess('alumno'),
    validarExistenciaDeMateria(),
    validateErrors
]

module.exports = {validarFindMateria, validarFindMateriaInscripta}