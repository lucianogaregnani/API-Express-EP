const db = require('../models/index')
const user = db.sequelize.models.User
const materia = db.sequelize.models.Materia
const nota = db.sequelize.models.Nota

const findAlumnos = async (req, res) => {
    const materias = await materia.findOne({
        where: {
            profesorId: req.uid
        },
        attributes: [],
        include: [{
            model: user,
            attributes: ['email'],
            through: {
                model: nota,
                attributes: ['primerParcial', 'segundoParcial'],
            }
        }]
    })
    res.json(materias)
}

module.exports = findAlumnos