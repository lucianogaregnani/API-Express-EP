const {validationResult} = require('express-validator')

function validateErrors(req, res, next) {
    const errors = validationResult(req).errors
    const erroresAux = errors.map(error => ({error: error.msg}))
    if(erroresAux) return res.status(400).json(erroresAux)

    next()
}

module.exports = validateErrors