const db = require('../models/index')
const carrera = db.sequelize.models.Carrera

const findInstitutosAdminQuery = (pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
        attributes:['id', 'nombre'],
        include: [{
            model: carrera,
            as: 'carrera',
            attributes: ['id', 'nombre']
        }],
        limit:size,
        offset:page
    }
}

module.exports = {findInstitutosAdminQuery}