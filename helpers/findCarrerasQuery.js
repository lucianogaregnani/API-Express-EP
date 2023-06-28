const db = require('../models/index')
const materia = db.sequelize.models.Materia

const findCarrerasAdminQuery = () => {
    return {
        attributes:['id', 'nombre'],
        include: [{
            model: materia,
            as: 'materia',
            attributes: ['id', 'nombre']
        }]
    }
}


module.exports = {findCarrerasAdminQuery}