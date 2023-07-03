const db = require('../models/index')
const user = db.sequelize.models.User

const findAlumnosQuery = (profesorId, pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
            attributes: ['nombre'],
            where: {
                profesorId
            },
            include: [{
                model: user,
                as:'alumnos',
                attributes: ['id', 'email', 'nombre'],
                through: {
                    as:'nota',
                    attributes: ['primerParcial', 'segundoParcial']
                }
            }],
            limit:size,
            offset:page
    }
}

const findAlumnoQuery = (profesorId, alumnoId) => {
    const alumnosQueryAux = findAlumnosQuery(profesorId)

    alumnosQueryAux.include[0].where = { 
        id: alumnoId
    }
    return alumnosQueryAux
}

module.exports = {findAlumnosQuery, findAlumnoQuery}