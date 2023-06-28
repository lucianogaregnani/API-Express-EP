const db = require('../models/index')
const {generateToken, generateRefreshToken} = require('../utils/tokenManager')
const roles = require('../utils/roles')

const user = db.sequelize.models.User

const login = async (req, res) => {
    try {
        const userLogin = await user.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!userLogin) return res.status(403).json({error: 'No existe este usuario'})
        
        const isValidPassword = userLogin.comparePassword(req.body.password)
        if(!isValidPassword) return res.status(400).json({error: 'La contraseña es incorrecta'})

        const {token, expiresIn} = generateToken(userLogin.id)

        generateRefreshToken(userLogin.id, res)
        
        return res.json({token, expiresIn})
    }
    catch(err) {
        res.status(400).json({error: err.message})
    }
}

const register = async (req, res) => {
    try {
        const {nombre, rol, email, password} = req.body

        if(!roles.includes(rol.toLowerCase())) throw new Error('Ese rol no existe.')

        await user.create({
            nombre,
            rol,
            email,
            password
        })
        return res.json({ok: true})
    }
    catch(err) {
        if(err.name === "SequelizeUniqueConstraintError") {
            res.status(400).json({error: 'Ya existe ese email'})
        }
        res.status(400).json({error: err.message})
    }
}

const infoUser = async (req, res) => {
    try {
        const userEmail = await user.findOne({
            where: {
                id: req.uid
            }
        }) 
        return res.json({
            id: userEmail.id,
            email: userEmail.email
        })
    } catch (error) {
        return res.status(500).json({error:'Error de servidor'})
    }
}

const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid)

        return res.json({token, expiresIn})

    } catch (error) {
        return res.status(500).json({error:'Error de servidor'})
    }
}

const logout = (req, res) => {
    res.clearCookie('refreshToken')
    res.json({ok:true})
}

module.exports = {login, register, infoUser, refreshToken, logout}