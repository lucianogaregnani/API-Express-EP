const { findMateriasAdminQuery } = require('../helpers/findMateriaQuery')
const db = require('../models/index')
const materia = db.sequelize.models.Materia

const findMateriasAdmin = async (req, res) => {
    try {
        const materias = await materia.findAll(findMateriasAdminQuery())
        res.status(500).json(materias)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findMateriaAdmin = async (req, res) => {
    try {
        const materiaAux = await materia.findByPk(req.params.id, findMateriasAdminQuery())
        res.status(500).json(materiaAux)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const asignarMateria = async (req, res) => {
    try {
        await materia.update({
                profesorId: req.params.profesorId
            },
            {
                where: {
                    id: req.params.materiaId
                }
            }
        )

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const desasignarMateria = async (req, res) => {
    try {
        await materia.update({
                profesorId: null
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        
        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const insertarMateria = async (req, res) => {
    try {
        const {nombre, profesorId, carreraId} = req.body

        materia.create({
            nombre,
            profesorId,
            carreraId,
        })

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const eliminarMateria = async (req, res) => {
    try {
        await materia.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {findMateriasAdmin, findMateriaAdmin, asignarMateria, desasignarMateria, insertarMateria, eliminarMateria}