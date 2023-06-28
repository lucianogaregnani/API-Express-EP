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
        const {nombre, directorId} = req.body
        await carrera.create({
            nombre,
            directorId
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
                id: req.params.id
            }
        })

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const asignarDirector = async (req, res) => {
    try {
        await carrera.update({
                directorId: req.params.directorId
            },
            {
                where: {
                    id: req.params.carreraId
                }
            }
        )

        res.json({ok:true})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const desasignarDirector = async (req, res) => {
    try {
        await carrera.update({
                directorId: null
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



module.exports = {findCarreras, insertarCarrera, findCarreraAdmin, eliminarCarrera, asignarDirector, desasignarDirector}