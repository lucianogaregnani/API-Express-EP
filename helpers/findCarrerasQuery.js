const db = require('../models/index')
const carrera = db.sequelize.models.Carrera
const materia = db.sequelize.models.Materia

const findCarrerasAdminQuery = (adminId) => {
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
        }]
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