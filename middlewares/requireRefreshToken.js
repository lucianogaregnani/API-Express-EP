const {tokenVerificationErrors} = require('../utils/tokenManager')
const jwt = require('jsonwebtoken')

function requireRefreshToken(req, res, next) {
    try {
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) throw new Error('no existe la cookie')

        const { uid } = jwt.verify(refreshToken, process.env.JWT_REFRESH)

        req.uid = uid

        next()
    } catch (error) {
        return res.status(401).json({
            error: tokenVerificationErrors[error.message]
        }) 
    }
}

module.exports = {requireRefreshToken}