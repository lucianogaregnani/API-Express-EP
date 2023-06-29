const validateErrors = require('../middlewares/validateErrors')
const { validateAccess } = require('./validateUser')
const { validarExistenciaDeMateria } = require('./validateCarrera')

const validarFindMateria = [
    validateAccess('Alumno'),
    validarExistenciaDeMateria('id'),
    validateErrors
]

module.exports = {validarFindMateria}