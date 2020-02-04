require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')
const _ = require('lodash')
const {mongoose} = require('./db/mongoose')

const usuariosRuta = require('./routes/usuario-rutas');
const cors = require('cors')
//const cuentaRuta = require('./routes/cuenta-rutas');
const { autenticacion } = require('./middlewares/autenticacion')




const app = express()
app.use(cors())

const port = process.env.PORT

app.use(bodyParser.json())

app.use('/api', autenticacion)
app.use('/api', usuariosRuta);
//app.use('/api', cuentaRuta)


app.listen(port, () => {
    console.log(`Started up at port ${port}`)
})






module.exports = { app }