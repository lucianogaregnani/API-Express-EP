const express = require('express')
const router = express.Router()
const {login, register, logout, refreshToken} = require('../controllers/auth.controller')
const {validateRegister, validateLogin} = require('../middlewares/validateUser')
const { requireRefreshToken } = require('../middlewares/requireRefreshToken')

router.post('/login', validateLogin, login)

router.post('/register', validateRegister, register)

router.get('/refresh', requireRefreshToken ,refreshToken)

router.get('/logout', logout)

module.exports = router