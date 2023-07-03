const { Op } = require('sequelize')
const { updateAdminQuery } = require('../helpers/adminQuery')
const { findCarrerasAdminQuery, findCarreraAdminQuery } = require('../helpers/findCarrerasQuery')
const db = require('../models/index')
const carrera = db.sequelize.models.Carrera 
const instituto = db.sequelize.models.Instituto 

const findCarreras = async (req, res) => {
    try {
        const {page, size} = req.query
        const carreras = await instituto.findAll(findCarrerasAdminQuery(req.uid, page, size)) 
        res.json(carreras)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findCarreraAdmin = async (req, res) => {
    try {
        const carreraAux = await instituto.findOne(findCarreraAdminQuery(req.uid, req.params.id))
        res.json(carreraAux.carrera[0])
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const insertarCarrera = async (req, res) => {
    try {
        //TODO: Pasarlo a un middlewar de validacion
        const institutoAux = await instituto.findOne({
            where:{
                [Op.and]: {
                    adminId: req.uid,
                    id: req.body.institutoId
                }
            }
        })

        if(!institutoAux) throw new Error('No tenes ese instituto asignado')
        
        const {nombre, adminId} = req.body
        await carrera.create({
            nombre,
            adminId,
            institutoId: institutoAux.id
        })
        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const eliminarCarrera = async (req, res) => {
    try {

        await carrera.destroy({
            where: {
                id: req.params.id,
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