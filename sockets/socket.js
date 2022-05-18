const { io } = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');
const VotationPages = require('../models/votation_pages.js');

const votationPages = new VotationPages();

// Mensajes de sockets
// Client es el cliente que consulta al servidor. io es la llegada y retorno de salida del servidor
io.on('connection', client => {
    console.log('Cliente conectado');
    console.log(client.handshake.headers);
    client.join(client.handshake.headers.sala);
   

    // !  io.emit                ->  Emite un mensaje a todos los clientes conectados
    // !  client.broadcast.emit  ->  Emite a todos menos al que lo envía
    // !  client.emit            ->  Devuelve información al cliente que se conecta
    // !  client.on              ->  Recive una emisión de un cliente


   if (votationPages.existVotationPage(client.handshake.headers.sala)) {
       
       const votationPage = votationPages.getVotationPage(client.handshake.headers.sala);
       const  bands = votationPage.bands;
    
        // Al conectarse un cliente al servidor. Se devuelve a ese cliente:
        client.emit('active-bands', bands.getBands());


        client.on('vote-band', (payload)=>{
            console.log('vote band');
            console.log(payload);

            bands.voteBand( payload.id);

            io.to(client.handshake.headers.sala).emit('active-bands', bands.getBands()); 
        });

        client.on('add-band', (payload)=>{
            console.log('add-band');
            console.log(payload);

            bands.addBand( new Band(payload.name));

            io.to(client.handshake.headers.sala).emit('active-bands', bands.getBands()); 
        });

        client.on('delete-band', (payload)=>{
            console.log('delete-band');
            console.log(payload);

            bands.deleteBand( payload.id);

            io.to(client.handshake.headers.sala).emit('active-bands', bands.getBands()); 
        });

        client.on('mensaje', (payload)=>{
            console.log('mensaje!!');
            console.log(payload);
            
            io.to(client.handshake.headers.sala).emit('mensaje', {admin: 'ADMIN mensaje'}); 
        });
        
        client.on('disconnect', () => { 
            console.log('Cliente desconectado');
        });
      

    } else {
        // TODO Comproar si existe la sala. sino mandar un evento al front para comunicarlo al usuario
        console.log('La sala no existe');
        client.emit('exist-room', { 'exist-room': false });
      
    }

  });