const express = require('express')
const {findAlumnos, findAlumno, actualizarNotas} = require('../controllers/profesor.controller')
const { validateAccess } = require('../middlewares/validateUser')
const { validateFindAlumno, validarActualizacionDeNotas, validarFindMaterias } = require('../middlewares/validateProfesor')
const router = express.Router()

/**
 *  @swagger
 *  /api/v1/profesor/alumnos/{id}:
 *      get:
 *          summary: Devuelve una lista con todas notas de los alumnos de la materia
 *          tags: [Profesor]
 *          parameters:
 *              - in: query
 *                name: size
 *                schema:
 *                  type: integer
 *              - in: query
 *                name: page
 *                schema: 
 *                  type: integer
 *              - in: path
 *                name: id
 *                schema:
 *                  type: integer
 *                  description: El id de la materia
 *                required: true 
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
 *                                      primerParcial: 
 *                                          type: integer
 *                                          description: La nota del primer parcial
 *                                      segundoParcial:
 *                                          type: string
 *                                          description: La nota del segundo parcial
 *                                      materiaId: 
 *                                          type: integer
 *                                          description: La id de la materia
 *                                      alumnoId: 
 *                                          type: integer
 *                                          description: La id del alumno
 *                                  
 *              400: 
 *                   description: Bad request
 */
router.get('/alumnos/:id', validarFindMaterias, findAlumnos)

/**
 *  @swagger
 *  /api/v1/profesor/alumno/{id}:
 *      get:
 *          summary: Devuelve un alumno
 *          tags: [Profesor]
 *          parameters:
 *             - in: path
 *               name: id    
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del alumno
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
 *                                          description: La id del alumno
 *                                      email: 
 *                                          type: string
 *                                          description: El email del alumno
 *                                      nombre: 
 *                                          type: string
 *                                          description: El nombre del alumno
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
router.get('/alumno/:id', validateFindAlumno, findAlumno)

/**
 *  @swagger 
 *  /api/v1/profesor/notasdeparcial/{id}:
 *      put:
 *          summary: Asigna un admin a un instituto
 *          parameters:
 *             - in: path
 *               name: id 
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id del alumno a modificar la nota
 *             - in: path
 *               name: materiaId 
 *               schema:
 *                  type: string
 *               required: true 
 *               description: El id de la materia en la que se va a modificar la nota
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              primerParcial:
 *                                  type: integer
 *                                  description: Nota del primer parcial
 *                                  required: true
 *                              segundoParcial:
 *                                  type: integer
 *                                  description: Nota del segundo parcial
 *                                  required: true
 *          tags: [Profesor]
 *          responses:
 *              200:
 *                  description: Ok
 *              400: 
 *                  description: Bad request
 */
router.put('/notasdeparcial/:id/:materiaId', validarActualizacionDeNotas, actualizarNotas)

module.exports = router