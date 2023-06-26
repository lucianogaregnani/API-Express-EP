const {validationResult} = require('express-validator')

function validateErrors(req, res, next) {
    const errors = validationResult(req)
    if(!errors.isEmpty()) return res.status(400).send({errors: errors})

    next()
}

module.exports = validateErrors