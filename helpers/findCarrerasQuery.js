const db = require('../models/index')
const carrera = db.sequelize.models.Carrera
const materia = db.sequelize.models.Materia

const findCarrerasAdminQuery = (adminId, pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
        where: {
            adminId
        },
        attributes:['id', 'nombre'],
        include: [{
            model: carrera,
            as: 'carrera',
            attributes: ['id', 'nombre'],
            include: [{
                model: materia,
                as: 'materia',
                attributes: ['id', 'nombre'],
            }]
        }],
        limit:size,
        offset:page
    }
}

const findCarreraAdminQuery = (adminId, carreraId) => {
    return {
        where: {
            adminId
        },
        attributes:[],
        include: [{
            model: carrera,
            as: 'carrera',
            attributes: ['id', 'nombre'],
            where: {
                id:carreraId
            },
            include: [{
                model: materia,
                as: 'materia',
                attributes: ['id', 'nombre'],
            }]
        }]
    }
}

module.exports = {findCarrerasAdminQuery, findCarreraAdminQuery}