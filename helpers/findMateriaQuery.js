const db = require('../models/index')
const materia = db.sequelize.models.Materia

const findMateriasQuery = (alumnoId) => {
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
                attributes: ['primerParcial', 'segundoParcial']
            }
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

module.exports = {findMateriaQuery, findMateriasQuery}