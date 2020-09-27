// Inicializamos express
const express   = require('express');
// Ejecutamos expres para levantar el servidor
const app       = express();
// Este es un servidor tradicional de node
const server    = require('http').Server(app);
// Este es para el web socket.
const io        = require('socket.io')(server);

// Usamos recursos estaticos para express.
app.use(express.static('public'));

// Este detecta cuando hay una nueva conexión
io.on('connection', function ( socket ) {
    console.log('Nuevo cliente conectado');
    socket.emit('mensaje', 'Bienvenido!');
});


setInterval(() => {
    io.emit('mensaje', 'Hola a todos este es un nuevo mensaje.')
}, 3000);


// Para que escuche en algun puerto.
server.listen(8080, function () {
    console.log('Servidor iniciado en http://localhost:8080');
});