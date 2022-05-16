const { io } = require('../index.js');

// Mensajes de sockets
// Client es el cliente que consulta al servidor. io es la llegada y retorno de salida del servidor
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado');
     });

     client.on('mensaje', (payload)=>{
         console.log('mensaje!!');
         console.log(payload);

         // Emite un mensaje a todos los clientes conectados
         io.emit('mensaje', {admin: 'nuevo mensaje'}); 
     })


  });