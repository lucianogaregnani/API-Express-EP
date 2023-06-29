const {body} = require('express-validator')
const validateErrors = require('../middlewares/validateErrors')
const { requireToken, requireRol } = require('./requireToken')

const validateEmail = () => body('email', 'no es un email válido').trim().isEmail()

const validatePassword = () => body('password', 'La contraseña no es segura').isLength({min:5})

const validateRepassword = () => body('password', 'No coinciden las contraseñas').custom((value, {req}) => {
                                    if(value === req.body.repassword) {
                                        return value
                                    } 
                                })

const validateAccess = (rol) => [
    requireToken,
    requireRol(rol)
] 

// Validar roles
const validateRegister = [
    validateEmail(),
    validatePassword(),
    validateRepassword(),
    validateErrors
]

// Otras validaciones
const validateLogin = [
    validateEmail(),
    validatePassword(),
    validateErrors
]

module.exports = {validateRegister, validateLogin, validateAccess}