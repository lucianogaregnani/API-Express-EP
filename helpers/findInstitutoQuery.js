const db = require('../models/index')
const carrera = db.sequelize.models.Carrera

const findInstitutosAdminQuery = (adminId) => {
    return {
        where:{
            adminId: adminId
        },
        attributes:['id', 'nombre'],
        include: [{
            model: carrera,
            as: 'carrera',
            attributes: ['id', 'nombre']
        }]
    }
}

module.exports = {findInstitutosAdminQuery}