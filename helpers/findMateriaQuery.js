const db = require('../models/index')
const materia = db.sequelize.models.Materia
const user = db.sequelize.models.User
const carrera = db.sequelize.models.Carrera

const findMateriasQuery = (alumnoId, pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
        where: {
            id: alumnoId
        },
        attributes: [],
        include: [{
            model: materia,
            attributes: ['id', 'nombre'],
            through: {
                as:'nota',
                attributes: ['primerParcial', 'segundoParcial'],
            },
        }],
        limit:size,
        offset:page
    }
}

const findMateriaQuery = (alumnoId, materiaId) => {
    const queryAux = findMateriasQuery(alumnoId)

    queryAux.include[0].where = {
        id: materiaId
    }

    return queryAux
}

const findMateriasAdminQuery = (pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
        attributes:['id', 'nombre'],
        include: [{
                model: user,
                as: 'profesor',
                attributes: ['id', 'nombre']
            },
            {
                model: carrera,
                as: 'carrera',
                attributes: ['id', 'nombre']
            }
        ],
        limit: size,
        offset: page
    }
}

const findMateriaAdminQuery = () => {
    return {
        attributes:['id', 'nombre'],
        include: [{
                model: user,
                as: 'profesor',
                attributes: ['id', 'nombre']
            },
            {
                model: carrera,
                as: 'carrera',
                attributes: ['id', 'nombre']
            }
        ]
    }
}

module.exports = {findMateriaQuery, findMateriasQuery, findMateriasAdminQuery, findMateriaAdminQuery}