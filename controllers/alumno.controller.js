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
        res.json(notas)
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
        res.json(notas)
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
    
        res.json({notaAVer})
    } catch (error) {
        res.status(400).json({error: error})
    }
}

const darseDeBaja = async (req, res) => {

}

module.exports = {findMateria, findMaterias, inscribirseAMateria}