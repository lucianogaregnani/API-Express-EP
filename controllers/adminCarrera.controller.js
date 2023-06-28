const db = require('../models/index')
const materia = db.sequelize.models.Materia
const user = db.sequelize.models.User

const findMateriasAdmin = async (req, res) => {
    try {
        const materias = await materia.findAll({
            attributes:['id', 'nombre'],
            include: [{
                model: user,
                as: 'profesor',
                attributes: ['id', 'nombre']
            }]
        })
        res.status(500).json({materias: materias})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {findMateriasAdmin}