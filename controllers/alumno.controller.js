const { Op } = require('sequelize')
const db = require('../models/index')
const { findMateriaQuery, findMateriasQuery } = require('../helpers/findMateriaQuery')
const user = db.sequelize.models.User
const nota = db.sequelize.models.Nota

const findMaterias = async (req,res) => {
    try {
        const materias = await user.findOne(findMateriasQuery(req.uid))
        res.status(200).json(materias.Materia)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const findMateria = async (req, res) => {
    try {
        const materia = await user.findOne(findMateriaQuery(req.uid, req.params.id))
        res.status(200).json(materia.Materia[0])
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const inscribirseAMateria = async (req, res) => {
    try {
        const notaAVer = await nota.create({
            materiaId: parseInt(req.params.id),
            alumnoId: req.uid
        })
    
        res.status(200).json({notaAVer})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const darseDeBaja = async (req, res) => {
    try {
        const materiaDeBaja = nota.destroy({
            where: {
                [Op.and]: {
                    materiaId: req.params.materiaId,
                    alumnoId: req.params.alumnoId
                }
            }
        })

        res.status(200).json({materiaDeBaja})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {findMateria, findMaterias, inscribirseAMateria, darseDeBaja}