const jwt = require('jsonwebtoken')
const {tokenVerificationErrors} = require('../utils/tokenManager') 
const db = require('../models/index')
const user = db.sequelize.models.User

const requireToken = (req, res, next) => {
    try {
        let token = req.headers?.authorization

        if(!token) throw new Error('No Bearer')

        token = token.split(" ")[1]

        const {uid} = jwt.verify(token, process.env.JWT_SECRET)

        req.uid = uid

        next()
    } catch (error) {
        return res.status(401).send({
            error: tokenVerificationErrors[error.message]
        }) 
    }
}

const rolValidator = async (id, rol) => {
    const rolLower = rol.toLowerCase()

    const userRol = await user.findOne({
        where: {
            id: id,
        }
    })

    const userRolLower = userRol.rol.toLowerCase()

    if(userRolLower !== rolLower) throw new Error('No tenes los permisos necesarios')

}

const requireRol = (rol) => async (req, res, next) => {
    try {
        await rolValidator(req.uid, rol)
        next()
    } catch (error) {
        res.status(401).json({error: error.message})
    }
}

module.exports = {requireToken, requireRol}