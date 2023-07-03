const db = require('../models/index')
const materia = db.sequelize.models.Materia
const carrera = db.sequelize.models.Carrera
const user = db.sequelize.models.User

const findMateriasQuery = (alumnoId) => {
    return {
        where: {
            id: alumnoId
        },
        attributes: [],
        include: [{
            model: materia,
            as:'alumnos',
            attributes: ['id', 'nombre'],
            through: {
                as:'nota',
                attributes: ['primerParcial', 'segundoParcial'],
            },
        }]
    }
}

const findMateriaQuery = (alumnoId, materiaId) => {
    const queryAux = findMateriasQuery(alumnoId)

    queryAux.include[0].where = {
        id: materiaId
    }

    return queryAux
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