const express = require('express');
const path = require('path');
require('dotenv').config();


// DB Config
const { dbConnection } = require('./database/config').dbConnection();

// App de express (compatible con el servidor)
const app = express();


// Lectura y parseo del body (http)
app.use( express.json() );   //app.use son middlewares (funciones que se ejecutan)


// NODE SERVER
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server); //lo exporto para importarlo en sockets.js

// Llamo al archivo sokets.js
require('./sockets/socket.js');

// Path público
const puclicPath = path.resolve( __dirname, 'public' );   // __dirname apunta a donde está montado el servidor. public apunta a la carpeta public de la raiz
// Se sirve el publicPath mostrando el index.html
app.use(express.static(puclicPath));

// RUTAS
app.use( '/api/login', require('./routes/auth') );


// process.env.PORT recoge del archivo .env (variables de entorno) la variable PORT
server.listen(process.env.PORT, (err)=>{
    if (err) throw new Error(err);
    console.log('Servidor corriendo en puerto ', process.env.PORT)
} );