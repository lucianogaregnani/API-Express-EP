const { Op } = require('sequelize')

const actualizarNotaQuery = (primerParcial, segundoParcial, alumnoId, materiaId) => {
    return [{
        primerParcial: primerParcial,
        segundoParcial: segundoParcial
    }, 
    {
        where: {
            [Op.and]: {
                alumnoId: alumnoId,
                materiaId: materiaId
            }
        }
    }]
}

module.exports = {actualizarNotaQuery}