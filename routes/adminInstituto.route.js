const express = require('express')
const { findCarreras, insertarCarrera, eliminarCarrera, findCarreraAdmin, asignarAdministrador, desasignarAdministrador } = require('../controllers/adminInstituto.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validarInsertarCarrera, validarEliminarCarrera, validarDesasignarCarrera, validarAsignarCarrera } = require('../middlewares/validateInstituto')
const router = express.Router()

/**
 *  @swagger
 *  /api/v1/admininstituto/carreras:
 *      get:
 *          summary: Devuelve una lista con todas las carreras
 *          tags: [Administrador de instituto]
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
 *                                          description: La id de la carrera
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre de la carrera
 *                                      materia: 
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id: 
 *                                                      type: integer
 *                                                      description: La id de la materia
 *                                                  segundoParcial:
 *                                                      type: string
 *                                                      description: El nombre de la materia
 *                                  
 *              400: 
 *                   description: Bad request
 */
router.get('/carreras', validateAccess('adminInstituto'), findCarreras)

/**
 *  @swagger 
 *  /api/v1/admininstituto/insertarcarrera:
 *      post:
 *          summary: Inserta una carrera
 *          tags: [Administrador de instituto]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              nombre: 
 *                                  type: string
 *                                  description: El nombre de la carrera
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.post('/insertarcarrera', validarInsertarCarrera, insertarCarrera)

/**
 *  @swagger 
 *  /api/v1/admininstituto/eliminarcarrera/{id}:
 *      delete:
 *          summary: Elimina una carrera
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la carrera a eliminar
 *          tags: [Administrador de instituto]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.delete('/eliminarcarrera/:id', validarEliminarCarrera, eliminarCarrera)

/**
 *  @swagger
 *  /api/v1/admininstituto/carrera/{id}:
 *      get:
 *          summary: Devuelve una carrera
 *          tags: [Administrador de instituto]
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la carrera
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
 *                                          description: La id de la carrera
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre de la carrera
 *                                      materia: 
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id: 
 *                                                      type: integer
 *                                                      description: La id de la materia
 *                                                  nombre:
 *                                                      type: string
 *                                                      description: La id de la materia
 *              400: 
 *                   description: Bad request
 */
router.get('/carrera/:id', validarEliminarCarrera, findCarreraAdmin)

/**
 *  @swagger 
 *  /api/v1/admininstituto/asignarcarrera/{carreraId}/{adminId}:
 *      put:
 *          summary: Asigna un admin a una carrera 
 *          parameters:
 *             - in: path
 *               name: adminId    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del admin a asignar
 *             - in: path
 *               name: carreraId
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la carrera
 *          tags: [Administrador de instituto]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/asignarcarrera/:carreraId/:adminId', validarAsignarCarrera, asignarAdministrador)

/**
 *  @swagger 
 *  /api/v1/admin/desasignarcarrera/:id:
 *      put:
 *          summary: Desasigna un admin de una carrera
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del admin a desasignar
 *          tags: [Administrador de instituto]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/desasignarcarrera/:id', validarDesasignarCarrera, desasignarAdministrador)

module.exports = router