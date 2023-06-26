const process = require('process');
const express = require('express')

const authRouter = require('./routes/auth.route');
const alumnoRouter = require('./routes/alumno.route')

const cookieParser = require('cookie-parser');

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/alumno', alumnoRouter)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))