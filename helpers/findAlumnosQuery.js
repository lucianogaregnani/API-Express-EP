const db = require('../models/index')
const user = db.sequelize.models.User
const nota = db.sequelize.models.Nota


const findAlumnosQuery = (profesorId) => {
    return {
            where: {
                profesorId: profesorId
            },
            attributes: [],
            include: [{
                model: user,
                attributes: ['id', 'email', 'nombre'],
                through: {
                    as:'nota',
                    model: nota,
                    attributes: ['primerParcial', 'segundoParcial']
                }
            }]
    }
}

const findAlumnoQuery = (profesorId, alumnoId) => {
    const alumnosQueryAux = findAlumnosQuery(profesorId)

    alumnosQueryAux.include.where = { 
        alumnoId: alumnoId
    }
    return alumnosQueryAux
}

module.exports = {findAlumnosQuery, findAlumnoQuery}