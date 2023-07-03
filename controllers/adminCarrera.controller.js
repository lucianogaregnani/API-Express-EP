const { Op } = require('sequelize')
const { findMateriasAdminQuery, findMateriaAdminQuery } = require('../helpers/findMateriaQuery')
const db = require('../models/index')
const materia = db.sequelize.models.Materia
const carrera = db.sequelize.models.Carrera

const findMateriasAdmin = async (req, res) => {
    try {
        const {page, size} = req.query
        const materias = await materia.findAll(findMateriasAdminQuery(req.uid, page, size))
        res.json(materias)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findMateriaAdmin = async (req, res) => {
    try {
        const materiaAux = await materia.findByPk(req.params.id, findMateriaAdminQuery(req.uid))
        res.json(materiaAux)
    } catch (error) {
        res.status(400).json({error:error.msessage})
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
         //TODO: Pasarlo a un middlewar de validacion
        const carreraAux = await carrera.findOne({
            where:{
                [Op.and]: {
                    adminId: req.uid,
                    id: req.body.carreraId
                }
            }
        })

        if(!carreraAux) throw new Error('No tenes esa carrera asignada')

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