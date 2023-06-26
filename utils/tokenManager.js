const jwt = require('jsonwebtoken')

function generateToken(id, res) {
    const expiresIn = 60 * 30
    try {
        const token = jwt.sign({uid: id}, process.env.JWT_SECRET, {expiresIn})
        return {token, expiresIn}
    }
    catch(err) {
        return err
    }
}

function generateRefreshToken(uid, res) {
    try {
        const expiresIn = 60 * 60 * 24 * 30
        const refreshToken = jwt.sign({uid: uid}, process.env.JWT_REFRESH, {expiresIn})
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true, 
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        })
    } catch (error) {
        console.log(error)
    }
}

const tokenVerificationErrors = {
    'invalid signature' : 'La firma del JWT no es válida', 
    'jwt expired' : 'JWT expirado',
    'invalid token' : 'Token no válido',
    'jwt malformed' : 'Token mal formado',
    'No Bearer' : 'Utiliza formato Bearer'
}

module.exports = {generateToken, generateRefreshToken, tokenVerificationErrors}