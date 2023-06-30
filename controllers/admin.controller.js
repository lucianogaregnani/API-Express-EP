const { Op } = require('sequelize')
const { findInstitutosAdminQuery } = require('../helpers/findInstitutoQuery')
const db = require('../models/index')
const { updateAdminQuery } = require('../helpers/adminQuery')
const instituto = db.sequelize.models.Instituto 

const insertarInstituto = async (req, res) => {
    try {
        await instituto.create({
            nombre: req.body.nombre,
            adminId: req.body.adminId
        })

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const eliminarInstituto = async (req, res) => {
    try {
        await instituto.destroy({
            where: {
                id: req.params.id
            }
        })

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findInstitutos = async (req, res) => {
    try {
        const {page, size} = req.query
        const institutos = await instituto.findAll(findInstitutosAdminQuery(page, size))
    
        res.json(institutos)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const findInstituto = async (req, res) => {
    try {
        const institutos = await instituto.findByPk(req.params.id, findInstitutosAdminQuery(req.uid))
    
        res.json(institutos)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const asignarAdmin = async (req, res) => {
    try {
        const [atributos, condicion] = updateAdminQuery(req.params.adminId, req.params.institutoId)

        console.log(atributos, condicion)
        await instituto.update(atributos, condicion)

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const desasignarAdmin = async (req, res) => {
    try {
        const [atributos, condicion] = updateAdminQuery(null, req.params.id)
        console.log(atributos, condicion)
        await instituto.update(atributos, condicion)
        
        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {insertarInstituto, eliminarInstituto, findInstitutos, findInstituto, asignarAdmin, desasignarAdmin}
