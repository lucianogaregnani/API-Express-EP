const { actualizarNotaQuery } = require('../helpers/actualizarNotaQuery')
const { findAlumnosQuery, findAlumnoQuery } = require('../helpers/findAlumnosQuery')
const db = require('../models/index')
const materia = db.sequelize.models.Materia
const nota = db.sequelize.models.Nota

const findAlumnos = async (req, res) => {
    try {
        const {page, size} = req.query
        const alumnos = await nota.findAll(findAlumnosQuery(req.params.id, page, size))

        res.json(alumnos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const findAlumno = async (req, res) => {
    try {
        const alumno = await materia.findOne(findAlumnoQuery(req.uid, req.params.id))

        res.json(alumno.alumnos[0])
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const actualizarNotas = async (req, res) => {
    try {
        const {primerParcial, segundoParcial} = req.body

        const materiaAux = await materia.findOne({ 
            where: {
                profesorId: req.uid
            } 
        })

        const [notas, condicion] = actualizarNotaQuery(primerParcial, segundoParcial, req.params.id, materiaAux.id)
        await nota.update(notas, condicion)

        res.json({ok: 'La nota fue actualizada correctamente'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {findAlumnos, findAlumno, actualizarNotas}