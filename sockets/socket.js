const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();
bands.addBand(new Band( 'Bon Jovi' ));
bands.addBand(new Band( 'Queen' ));
bands.addBand(new Band( 'El canto del loco' ));
bands.addBand(new Band( 'Heroes del silencio' ));
bands.addBand(new Band( 'ROSALIA' ));

console.log(bands);


// Mensajes de sockets
// Client es el cliente que consulta al servidor. io es la llegada y retorno de salida del servidor
io.on('connection', client => {
    console.log('Cliente conectado');

    // Al conectarse un cliente al servidor.
    client.emit('active-bands', bands.getBands());


    client.on('vote-band', (payload)=>{
        console.log('vote band');
        console.log(payload);

        bands.voteBand( payload.id);

        io.emit('active-bands', bands.getBands()); 

    })

    client.on('add-band', (payload)=>{
        console.log('add-band');
        console.log(payload);

        bands.addBand( new Band(payload.name));

        io.emit('active-bands', bands.getBands()); 

    })

    client.on('delete-band', (payload)=>{
        console.log('delete-band');
        console.log(payload);

        bands.deleteBand( payload.id);

        io.emit('active-bands', bands.getBands()); 

    })



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