const express = require('express')
const { findInstitutos, findInstituto, insertarInstituto, eliminarInstituto, asignarAdmin, desasignarAdmin } = require('../controllers/admin.controller')
const { validarFindInstituto, validarInsertarInstituto, validarEliminarInstituto, validarAsignarAdmin, validarDesasignarAdmin } = require('../middlewares/validateAdmin')
const { validateAccess } = require('../middlewares/validateUser')
const router = express.Router()

/**
 *  @swagger
 *  /api/v1/admin/institutos:
 *      get:
 *          summary: Devuelve una lista con todos los institutos
 *          tags: [Administrador]
 *          responses:
 *              200:
 *                  description: Ok
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties: 
 *                                      id: 
 *                                          type: integer
 *                                          description: La id del instituto
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre del instituto
 *                                      carrera: 
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id: 
 *                                                      type: integer
 *                                                      description: La id de la carrera
 *                                                  nombre:
 *                                                      type: string
 *                                                      description: La id de la carrera
 *                                  
 *              400: 
 *                   description: Bad request
 */
router.get('/institutos', validateAccess('admin'), findInstitutos)

/**
 *  @swagger
 *  /api/v1/admin/instituto/{id}:
 *      get:
 *          summary: Devuelve un instituto
 *          tags: [Administrador]
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del instituto
 *          responses:
 *              200:
 *                  description: Ok
 *                  content:
 *                      application/json:
 *                          schema:
 *                                  type: object
 *                                  properties: 
 *                                      id: 
 *                                          type: integer
 *                                          description: La id del instituto
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre del instituto
 *                                      carrera: 
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id: 
 *                                                      type: integer
 *                                                      description: La id de la carrera
 *                                                  nombre:
 *                                                      type: string
 *                                                      description: La id de la carrera
 *              400: 
 *                   description: Bad request
 */
router.get('/instituto/:id', validarFindInstituto, findInstituto)

/**
 *  @swagger 
 *  /api/v1/admin/insertarinstituto:
 *      post:
 *          summary: Inserta un instituto
 *          tags: [Administrador]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              nombre: 
 *                                  type: string
 *                                  description: El nombre del instituto
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.post('/insertarinstituto', validarInsertarInstituto, insertarInstituto)

/**
 *  @swagger 
 *  /api/v1/admin/eliminarinstituto/{id}:
 *      delete:
 *          summary: Elimina un instituto
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del instituto a eliminar
 *          tags: [Administrador]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.delete('/eliminarinstituto/:id', validarEliminarInstituto, eliminarInstituto)

/**
 *  @swagger 
 *  /api/v1/admin/asignaradmin/{adminId}/{institutoId}:
 *      put:
 *          summary: Asigna un admin a un instituto
 *          parameters:
 *             - in: path
 *               name: adminId    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del admin a asignar
 *             - in: path
 *               name: institutoId
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del instituto
 *          tags: [Administrador]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/asignaradmin/:adminId/:institutoId', validarAsignarAdmin, asignarAdmin)

/**
 *  @swagger 
 *  /api/v1/admin/desasignaradmin/:id:
 *      put:
 *          summary: Desasigna un admin de un instituto
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del admin a desasignar
 *          tags: [Administrador]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/desasignaradmin/:id', validarDesasignarAdmin, desasignarAdmin)

module.exports = router 