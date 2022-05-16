const express = require('express');
const path = require('path');
require('dotenv').config();

// App de express (compatible con el servidor)
const app = express();


// NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); //lo exporto para importarlo en sockets.js

// Llamo al archivo sokets.js
require('./sockets/socket.js');

// Path público
const puclicPath = path.resolve( __dirname, 'public' );   // __dirname apunta a donde está montado el servidor. public apunta a la carpeta public de la raiz
// Se sirve el publicPath mostrando el index.html
app.use(express.static(puclicPath));


// process.env.PORT recoge del archivo .env (variables de entorno) la variable PORT
server.listen(process.env.PORT, (err)=>{
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto ', process.env.PORT)
} );