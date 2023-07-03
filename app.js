const process = require('process');
const express = require('express')
const path = require('path')

const authRouter = require('./routes/auth.route');
const alumnoRouter = require('./routes/alumno.route')
const profesorRouter = require('./routes/profesor.route')
const adminCarreraRouter = require('./routes/adminCarrera.route')
const adminInstitutoRouter = require('./routes/adminInstituto.route')
const admin = require('./routes/admin.route')

const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Estrategias de persistencia',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:5000'
            }
        ]
    },
    apis: [`${path.join(__dirname, "./routes/*.js")}`]
}

const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/alumno', alumnoRouter)
app.use('/api/v1/profesor', profesorRouter)
app.use('/api/v1/admincarrera', adminCarreraRouter)
app.use('/api/v1/admininstituto', adminInstitutoRouter)
app.use('/api/v1/admin', admin)

const PORT = process.env.PORT || 5000
const server = app.listen(PORT, () => console.log(`http://localhost:${PORT}`))

module.exports = {app, server}