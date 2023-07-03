const db = require('../models/index')
const carrera = db.sequelize.models.Carrera
const materia = db.sequelize.models.Materia

const findMateriasQuery = (alumnoId, pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
        where: {
            alumnoId
        },
        attributes: ['primerParcial', 'segundoParcial', 'materiaId'],
        limit: size,
        offset: page
    }
}

const findMateriaQuery = (alumnoId, materiaId) => {
    return  {
        where: {
            id: alumnoId
        },
        include: [{
            model: materia,
            as: 'alumnos',
            attributes: ['nombre'],
            through: {
                as: 'nota',
                attributes: ['primerParcial', 'segundoParcial'],
                where: {
                    materiaId
                }
            }
        }]
    }
}

const findMateriasAdminQuery = (adminId, pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
        attributes: ['id', 'nombre', 'profesorId'],
        include: [{
                model: carrera,
                as: 'carrera',
                attributes: ['nombre'],
                where: {
                    adminId
                }
        }],
        limit: size,
        offset: page
    }
}

const findMateriaAdminQuery = (adminId) => {
    return {
        attributes: ['id', 'nombre', 'profesorId'],
        include: [{
                model: carrera,
                as: 'carrera',
                attributes: [],
                where: {
                    adminId
                }
        }],
    }
}

module.exports = {findMateriaQuery, findMateriasQuery, findMateriasAdminQuery, findMateriaAdminQuery}