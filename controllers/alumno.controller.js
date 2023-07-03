const { Op } = require('sequelize')
const db = require('../models/index')
const { findMateriaQuery, findMateriasQuery } = require('../helpers/findMateriaQuery')
const user = db.sequelize.models.User
const nota = db.sequelize.models.Nota

const findMaterias = async (req,res) => {
    try {
        const materias = await user.findOne(findMateriasQuery(req.uid))
        console.log(materias)
        res.status(200).json(materias.alumnos)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const findMateria = async (req, res) => {
    try {
        const materia = await user.findOne(findMateriaQuery(req.uid, req.params.id))
        res.status(200).json(materia.alumnos[0])
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const inscribirseAMateria = async (req, res) => {
    try {
        await nota.create({
            materiaId: req.params.id,
            alumnoId: req.uid
        })
    
        res.status(200).json({ok:true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const darseDeBaja = async (req, res) => {
    try {
        await nota.destroy({
            where: {
                [Op.and]: {
                    materiaId: req.params.id,
                    alumnoId: req.uid
                }
            }
        })

        res.status(200).json({ok:true})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {findMateria, findMaterias, inscribirseAMateria, darseDeBaja}