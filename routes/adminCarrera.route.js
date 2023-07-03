const express = require('express')
const router = express.Router()
const { findMateriasAdmin, findMateriaAdmin, asignarMateria, insertarMateria, desasignarMateria, eliminarMateria } = require('../controllers/adminCarrera.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validarFindMateria, validarAsignarMateria, validarInsertarMateria, validarEliminarMateria } = require('../middlewares/validateCarrera')

/**
 *  @swagger
 *  /api/v1/admincarrera/materias:
 *      get:
 *          summary: Devuelve una lista con todas las materias
 *          tags: [Administrador de carrera]
 *          parameters:
 *              - in: query
 *                name: size
 *                schema:
 *                  type: integer
 *              - in: query
 *                name: page
 *                schema: 
 *                  type: integer
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
 *                                          description: La id de la materia
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre de la materia
 *                                      profesorId:
 *                                          type: integer
 *                                          description: El id del profesor de la materia
 *                                      carrera: 
 *                                          type: object
 *                                          properties:
 *                                              nombre: string
 *                                              description: El nombre de la carrera al cual pertenece la materia
 *                                  
 *              400: 
 *                   description: Bad request
 */
router.get('/materias', validateAccess('adminCarrera'), findMateriasAdmin)

/**
 *  @swagger
 *  /api/v1/admincarrera/materia/{id}:
 *      get:
 *          summary: Devuelve una materia
 *          tags: [Administrador de carrera]
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la materia
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
 *                                          description: La id de la materia
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre de la materia
 *                                      profesorId: 
 *                                          type: string
 *                                          description: El id del profesor de la materia
 *              400: 
 *                   description: Bad request
 */
router.get('/materia/:id', validarFindMateria, findMateriaAdmin)

/**
 *  @swagger 
 *  /api/v1/admincarrera/asignarprofesor/{materiaId}/{profesorId}:
 *      put:
 *          summary: Asigna un profesor a una materia 
 *          parameters:
 *             - in: path
 *               name: profesorId    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del profesor a asignar
 *             - in: path
 *               name: materiaId
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la materia
 *          tags: [Administrador de carrera]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/asignarprofesor/:materiaId/:profesorId', validarAsignarMateria, asignarMateria)

/**
 *  @swagger 
 *  /api/v1/admincarrera/desasignarprofesor/:id:
 *      put:
 *          summary: Desasigna un profesor de una materia
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la materia a desasignar el profesor
 *          tags: [Administrador de carrera]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/desasignarprofesor/:id', validarFindMateria, desasignarMateria)

/**
 *  @swagger 
 *  /api/v1/admincarrera/insertarmateria:
 *      post:
 *          summary: Inserta una materia
 *          tags: [Administrador de carrera]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties: 
 *                              nombre: 
 *                                  type: string
 *                                  description: El nombre de la materia
 *                                  required: true
 *                              profesorId:
 *                                  type: integer
 *                                  description: El id del profesor de la materia
 *                                  required: true
 *                              carreraId:
 *                                  type: integer
 *                                  description: El id de la carrera a la que va a pertenecer la materia
 *                                  required: true
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.post('/insertarmateria', validarInsertarMateria, insertarMateria)

/**
 *  @swagger 
 *  /api/v1/admincarrera/eliminarmateria/{id}:
 *      delete:
 *          summary: Elimina una materia
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la materia a eliminar
 *          tags: [Administrador de carrera]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.delete('/eliminarmateria/:id', validarEliminarMateria, eliminarMateria)

module.exports = router