const express = require('express')
const router = express.Router()
const {login, register, logout, refreshToken} = require('../controllers/auth.controller')
const {validateRegister, validateLogin} = require('../middlewares/validateUser')
const { requireRefreshToken } = require('../middlewares/requireRefreshToken')

/**
 * @swagger 
 *  /api/v1/auth/login:
 *      post:
 *          summary: Loguea al usuario
 *          tags: [Auth]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              email: 
 *                                  type: string
 *                                  description: El email del usuario
 *                              password: 
 *                                  type: string
 *                                  description: La contraseña del usuario
 *          responses:
 *              200:
 *                  description: Ok
 *              403:
 *                  description: No existe este usuario
 *              400: 
 *                  description: Bad request
 */
router.post('/login', validateLogin, login)

/**
 *  @swagger 
 *  /api/v1/auth/register:
 *      post:
 *          summary: Registra un usuario
 *          tags: [Auth]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              email: 
 *                                  type: string
 *                                  description: El email del usuario
 *                              nombre: 
 *                                  type: string
 *                                  description: El nombre del usuario
 *                              rol: 
 *                                  type: string
 *                                  description: El rol del usuario
 *                              password: 
 *                                  type: string
 *                                  description: La contraseña del usuario
 *                              repassword: 
 *                                  type: string
 *                                  description: La contraseña de validación
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.post('/register', validateRegister, register)

/**
 *  @swagger
 *  /api/v1/auth/refresh:
 *      get:
 *          summary: Genera un refresh token
 *          tags: [Auth]
 *          responses:
 *              200:
 *                  description: Ok
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties: 
 *                                  token: 
 *                                      type: string
 *                                      description: La información del token
 *                                  expiresIn: 
 *                                      type: integer
 *                                      description: El tiempo de expiración del token
 *              400: 
 *                   description: Bad request
 */
router.get('/refresh', requireRefreshToken ,refreshToken)

/**
 *  @swagger
 *  /api/v1/auth/logout:
 *      get:
 *          summary: Desloguea el usuario
 *          tags: [Auth]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                   description: Bad request
 */
router.get('/logout', logout)

module.exports = router