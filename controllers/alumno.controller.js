const { Op } = require('sequelize')
const db = require('../models/index')
const user = db.sequelize.models.User
const materia = db.sequelize.models.Materia
const nota = db.sequelize.models.Nota

const findMaterias = async (req,res) => {
    try {
        const notas = await user.findOne({
            where: {
                id: req.uid
            },
            attributes: [],
            include: [{
                model: materia,
                attributes: ['nombre'],
                through: {
                    attributes: ['primerParcial', 'segundoParcial']
                }
            }]
        })
        res.status(200).json(notas)
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const findMateria = async (req, res) => {
    try {
        const notas = await user.findOne({
            where: {
                id: req.uid
            },
            attributes: [],
            include: [{
                model: materia,
                where: {
                    id: req.params.id
                },
                attributes: ['nombre'],
                through: {
                    attributes: ['primerParcial', 'segundoParcial']
                }
            }]
        })
        res.status(200).json(notas)
    } catch (error) {
        res.status(400).json({error: error})
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
        res.status(400).json({error: error})
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
        res.status(400).json({error: error})
    }
}

module.exports = {findMateria, findMaterias, inscribirseAMateria, darseDeBaja}