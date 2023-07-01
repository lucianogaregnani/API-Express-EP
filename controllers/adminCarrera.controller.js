const { findMateriasAdminQuery, findMateriaAdminQuery } = require('../helpers/findMateriaQuery')
const db = require('../models/index')
const materia = db.sequelize.models.Materia
const carrera = db.sequelize.models.Carrera

const findMateriasAdmin = async (req, res) => {
    try {
        const {page, size} = req.query
        const materias = await materia.findAll(findMateriasAdminQuery(page, size))
        res.json(materias)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findMateriaAdmin = async (req, res) => {
    try {
        const materiaAux = await materia.findByPk(req.params.id, findMateriaAdminQuery())
        res.json(materiaAux)
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
        const carreraAux = await carrera.findOne({
            where:{
                adminId: req.uid
            }
        })
        const {nombre, profesorId} = req.body

        materia.create({
            nombre,
            profesorId,
            carreraId: carreraAux.id,
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