const updateAdminQuery = (adminId, entidadId) => {
    return [{
        adminId: adminId
    },
    {
        where: {
            id: entidadId
        }
    }]
}

module.exports = {updateAdminQuery}