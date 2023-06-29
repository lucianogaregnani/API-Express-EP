const { Op } = require('sequelize')
const { updateAdminQuery } = require('../helpers/adminQuery')
const { findCarrerasAdminQuery } = require('../helpers/findCarrerasQuery')
const db = require('../models/index')
const carrera = db.sequelize.models.Carrera 

const findCarreras = async (req, res) => {
    try {
        const carreras = await carrera.findAll(findCarrerasAdminQuery()) 
        res.status(500).json(carreras)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findCarreraAdmin = async (req, res) => {
    try {

        const carreraAux = await carrera.findByPk(req.params.id, findCarrerasAdminQuery())
        res.status(500).json(carreraAux)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const insertarCarrera = async (req, res) => {
    try {
        const {nombre, institutoId, adminId} = req.body
        await carrera.create({
            nombre,
            institutoId,
            adminId
        })
        res.status(500).json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const eliminarCarrera = async (req, res) => {
    try {
        await carrera.destroy({
            where: {
                [Op.and]: {
                    id: req.params.id,
                    adminId: req.uid
                }
            }
        })

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const asignarAdministrador = async (req, res) => {
    try {
        const [atributos, condicion] = updateAdminQuery(req.params.adminId, req.params.carreraId)
        
        await carrera.update(atributos, condicion)
        
        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const desasignarAdministrador = async (req, res) => {
    try {
        const [atributos, condicion] = updateAdminQuery(null, req.params.id)

        await carrera.update(atributos, condicion)
        
        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


module.exports = {findCarreras, insertarCarrera, findCarreraAdmin, eliminarCarrera,
                asignarAdministrador, desasignarAdministrador}