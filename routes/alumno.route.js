const express = require('express')
const { findMaterias, findMateria, inscribirseAMateria, darseDeBaja } = require('../controllers/alumno.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validarFindMateria, validarFindMateriaInscripta } = require('../middlewares/validateAlumno')

const router = express.Router()

/**
 *  @swagger
 *  /api/v1/alumno/materias:
 *      get:
 *          summary: Devuelve una lista con todas las materias del alumno
 *          tags: [Alumno]
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
 *                                      nota: 
 *                                          type: object
 *                                          properties:
 *                                                  primerParcial: 
 *                                                      type: integer
 *                                                      description: La nota del primer parcial
 *                                                  segundoParcial:
 *                                                      type: integer
 *                                                      description: La nota del segundo parcial
 *                                  
 *              400: 
 *                   description: Bad request
 */
router.get('/materias', validateAccess('alumno'), findMaterias)

/**
 *  @swagger
 *  /api/v1/alumno/materia/{id}:
 *      get:
 *          summary: Devuelve un alumno
 *          tags: [Alumno]
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
 *                                      nota: 
 *                                          type: object
 *                                          properties:
 *                                                  primerParcial: 
 *                                                      type: integer
 *                                                      description: La nota del primer parcial
 *                                                  segundoParcial:
 *                                                      type: string
 *                                                      description: La nota del segundo parcial
 *              400: 
 *                   description: Bad request
 */
router.get('/materia/:id', validarFindMateriaInscripta, findMateria)

/**
 *  @swagger 
 *  /api/v1/alumno/inscripcion/{id}:
 *      post:
 *          summary: Inserta un instituto
 *          tags: [Alumno]
 *          params: 
 *              - in: path
 *                name: id
 *                schema: 
 *                  type: string
 *                required: true 
 *                description: El id de la materia a inscribirse
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.post('/inscripcion/:id', validarFindMateria, inscribirseAMateria)

/**
 *  @swagger 
 *  /api/v1/alumno/baja/{id}:
 *      delete:
 *          summary: Da de baja una materia
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la materia a dar de baja
 *          tags: [Alumno]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.delete('/baja/:id', validarFindMateriaInscripta, darseDeBaja)

module.exports = router