const db = require('../models/index')
const user = db.sequelize.models.User

const findAlumnosQuery = (materiaId, pagina, sizePagina) => {
    const page = parseInt(pagina) || 0
    const size = parseInt(sizePagina) || 10
    return {
            attributes: ['primerParcial','segundoParcial', 'materiaId', 'alumnoId'],
            where: {
                materiaId
            },
            limit: size,
            offset: page
    }
}

const findAlumnoQuery = (profesorId, alumnoId) => {
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
                attributes: ['primerParcial', 'segundoParcial'],
                where: {
                    alumnoId
                }
            },
        }],
    }
}

module.exports = {findAlumnosQuery, findAlumnoQuery}