const db = require('../models/index')
const user = db.sequelize.models.User
const nota = db.sequelize.models.Nota

const findAlumnosQuery = (profesorId) => {
    return {
            where: {
                profesorId: profesorId
            },
            attributes: [],
            include: [{
                model: user,
                attributes: ['id', 'email', 'nombre'],
                through: {
                    as:'nota',
                    model: nota,
                    attributes: ['alumnoId', 'primerParcial', 'segundoParcial']
                }
            }]
    }
}

module.exports = {findAlumnosQuery}