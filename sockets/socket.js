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
         io.emit('mensaje', {admin: 'ADMIN mensaje'}); 

     })

     client.on('emitir-mensaje', (payload)=>{
        console.log('nuevo-mensaje!!');
        console.log(payload);


       // io.emit('nuevo-mensaje', 'nuevo mensaje emitido desde el back');  // !Emite un mensaje a todos los clientes conectados
        client.broadcast.emit('emitir-mensaje','emite a todos menos al cliente que lo crea: ' + payload);        //! Emite un mensaje a todos los clientes conectados menos al que lo creó
    })


  });