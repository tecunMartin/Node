const express = require('express');
const app     = express();
const server  = require('http').Server(app);
const cors    = require('cors');

// Para las variables de entorno
require('dotenv').config();

const config  = require('./config')

const bodyParser = require('body-parser');
const db         = require("./db");
const socket     = require('./socket');
//const router   = require('./components/message/network');
const router     = require('./network/routers');

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(router);

// Crear la conexion con la DB correspondiente
db.connect(config.dbUrl);

socket.connect(server);

app.use(config.publicRoute, express.static('public'));

router( app );

// app.use('/app', express.static('public'));  
server.listen(config.port, function() {
    console.log(`La aplicacion esta escuchando en ${config.host}:${config.port}`);
});
