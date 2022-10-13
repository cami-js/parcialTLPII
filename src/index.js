//IMPORTAR LAS BIBLIOTECAS
const express = require('express')
const cors =require('cors')
const morgan = require('morgan')

require('dotenv').config()
const connectDB=require('./db/connection') //IMPORTAR LA FUNCIÓN DE LA CONCEXIÓN A LA BASE DE DATOS

//INICIALIZACIONES
const app = express();
connectDB()

//CONFIGURACIONES
const port=process.env.PORT ||4000;

// MIDDLEWARES
app.use(cors())
app.use(morgan("combined"))
app.use(express.json())

//IMPORTAR RUTAS
app.use(require("./components/routes/rutasUsuarios"))
app.use(require("./components/routes/rutasTareas"))
app.use(require("./components/routes/authRutas"))



//CONFIGURAR EL PUERTO E INICIALIZAR EL SERVIDOR
app.listen(port, console.log(`
    Servidor iniciado en: http://localhost:${port}
`))
