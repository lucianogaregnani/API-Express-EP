const { Op } = require('sequelize')
const { updateAdminQuery } = require('../helpers/adminQuery')
const { findCarrerasAdminQuery, findCarreraAdminQuery } = require('../helpers/findCarrerasQuery')
const db = require('../models/index')
const carrera = db.sequelize.models.Carrera 
const instituto = db.sequelize.models.Instituto 

// TODO: findCarrerasAdminQuery tiene que cambiar para que cumpla la siguiente condición:
// Tendria que buscar las carreras que tengan la id del insituto donde soy admin

const findCarreras = async (req, res) => {
    try {
        const carreras = await instituto.findOne(findCarrerasAdminQuery(req.uid)) 
        res.status(500).json(carreras)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findCarreraAdmin = async (req, res) => {
    try {
        const carreraAux = await instituto.findOne(findCarreraAdminQuery(req.uid, req.params.id))
        res.status(500).json(carreraAux.carrera[0])
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const insertarCarrera = async (req, res) => {
    try {
        const institutoAux = await instituto.findOne({
            where:{
                adminId: req.uid
            }
        })

        if(!institutoAux) throw new Error('No tenes ningun instituto asignado')
        
        const {nombre, adminId} = req.body
        await carrera.create({
            nombre,
            adminId,
            institutoId: institutoAux.id
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