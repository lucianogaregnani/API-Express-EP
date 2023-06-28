const { findAlumnosQuery } = require('../helpers/findAlumnosQuery')
const db = require('../models/index')
const materia = db.sequelize.models.Materia

const findAlumnos = async (req, res) => {
    try {
        const alumnos = await materia.findOne(findAlumnosQuery(req.uid))

        res.json(alumnos.Users)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const findAlumno = async (req, res) => {

    try {
        const alumnosQueryAux = findAlumnosQuery(req.uid)

        alumnosQueryAux.include.where = { 
            alumnoId: req.params.id 
        }

        const alumnos = await materia.findOne(alumnosQueryAux)
        res.json(alumnos.Users[0])
    } catch (error) {
        res.status(400).json({error: error})
    }
}

module.exports = {findAlumnos, findAlumno}