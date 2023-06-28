const process = require('process');
const express = require('express')

const authRouter = require('./routes/auth.route');
const alumnoRouter = require('./routes/alumno.route')
const profesorRouter = require('./routes/profesor.route')
const adminCarreraRouter = require('./routes/adminCarrera.route')
const adminInstitutoRouter = require('./routes/adminInstituto.route')

const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/alumno', alumnoRouter)
app.use('/api/v1/profesor', profesorRouter)
app.use('/api/v1/admincarrera', adminCarreraRouter)
app.use('/api/v1/admininstituto', adminInstitutoRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))