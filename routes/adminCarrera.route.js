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
 *                                      materia: 
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id: 
 *                                                      type: integer
 *                                                      description: La id del profesor
 *                                                  nombre:
 *                                                      type: string
 *                                                      description: El nombre del profesor
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
 *                                      materia: 
 *                                          type: array
 *                                          items:
 *                                              type: object
 *                                              properties:
 *                                                  id: 
 *                                                      type: integer
 *                                                      description: La id del profesor
 *                                                  nombre:
 *                                                      type: string
 *                                                      description: La id del profesor
 *              400: 
 *                   description: Bad request
 */
router.get('/materia/:id', validarFindMateria, findMateriaAdmin)

/**
 *  @swagger 
 *  /api/v1/admincarrera/asignarmateria/{materiaId}/{profesorId}:
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
router.put('/asignarmateria/:materiaId/:profesorId', validarAsignarMateria, asignarMateria)

/**
 *  @swagger 
 *  /api/v1/admincarrera/desasignarmateria/:id:
 *      put:
 *          summary: Desasigna un profesor de una materia
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del profesor a desasignar
 *          tags: [Administrador de carrera]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/desasignarmateria/:id', validarFindMateria, desasignarMateria)

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