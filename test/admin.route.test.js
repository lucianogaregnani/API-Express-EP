const supertest = require('supertest')
const {app, server} = require('../app')
const db = require('../models/index')
const user = db.sequelize.models.User

const api = supertest(app)

const buscarUsuarioPorEmail = async (email) => {
    const usuario = await user.findOne({
        where: {
            email
        }
    })
    return usuario
}

test('test', async () => {
    const registro = {
        nombre: "Luciano Garegnani",
        email: "garegnaniluciano@gmail.com",
        rol: "Admin",
        password: "123456",
        repassword: "123456"
    }

    await api.post('/api/v1/auth/register')
    .send(registro)
    .expect(200)
    .expect('Content-Type', /application\/json/)
    .expect(await buscarUsuarioPorEmail("garegnaniluciano@gmail.com")).toBeTruthy()
})

afterAll(() => {
    server.close()
})