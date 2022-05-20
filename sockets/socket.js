const { io } = require('../index.js');
const Option = require('../models/option.js');
const Polls = require('../models/polls.js');

const polls = new Polls();

// Mensajes de sockets
// Client es el cliente que consulta al servidor. io es la llegada y retorno de salida del servidor
io.on('connection', client => {

    console.log('Cliente conectado');
    console.log('DATOS:' ,client.handshake.headers.datos);
   

    // !  io.emit                ->  Emite un mensaje a todos los clientes conectados
    // !  client.broadcast.emit  ->  Emite a todos menos al que lo envía
    // !  client.emit            ->  Devuelve información al cliente que se conecta
    // !  client.on              ->  Recive una emisión de un cliente

    // Al conectarse un cliente al servidor. Se devuelve a ese cliente:
    client.emit('polls', polls.getPolls());


    client.on('add-poll', (payload)=>{
      const poll = polls.addPoll(payload.pollName,payload.creatorId);
      io.emit('polls', polls.getPolls());
      // io.to(client.handshake.headers.sala).emit('polls', polls.getPolls());
    });


    client.on('add-option', (payload)=>{
      const poll= polls.getPoll(payload.pollId);
      poll.addOption(new Option(payload.optionName))
      io.emit('active-options', poll.getOptions()); 
      // TODO
      // io.to(client.handshake.headers.sala).emit('active-options', poll.getOptions()); 
    });


    client.on('vote-option', (payload)=>{
      const poll= polls.getPoll(payload.pollId);
      poll.voteOption( payload.optionId);
      io.emit('active-options', poll.getOptions()); 
      // TODO
      // io.to(client.handshake.headers.sala).emit('active-options', poll.getOptions()); 
    });
      


//    if (polls.existPoll(client.handshake.headers.sala)) {
//        const votationPage = polls.getPoll(client.handshake.headers.sala);
//        const  options = votationPage.options;
    
//         // Al conectarse un cliente al servidor. Se devuelve a ese cliente:
//         client.emit('active-options', options.getOptions());

//         client.on('vote-option', (payload)=>{
//             console.log('vote option');
//             console.log(payload);

//             options.voteOption( payload.id);

//             io.to(client.handshake.headers.sala).emit('active-options', options.getOptions()); 
//         });

//         client.on('add-option', (payload)=>{
//             console.log('add-option');
//             console.log(payload);

//             options.addOption( new Option(payload.name));

//             io.to(client.handshake.headers.sala).emit('active-options', options.getOptions()); 
//         });

//         client.on('delete-option', (payload)=>{
//             console.log('delete-option');
//             console.log(payload);

//             options.deleteOption( payload.id);

//             io.to(client.handshake.headers.sala).emit('active-options', options.getOptions()); 
//         });

  
        
//         client.on('disconnect', () => { 
//             console.log('Cliente desconectado Server');
//         });
      

//     } else {
//         // TODO Comproar si existe la sala. sino mandar un evento al front para comunicarlo al usuario
//         console.log('La sala no existe');
//         client.emit('active-options', { 'exist-room': false });

//         client.on('create-room', (payload)=>{
//             console.log('create-room');
//             console.log(payload);
           
//            const newPoll= polls.addPoll(payload.title);
//            io.to(client.handshake.headers.sala).emit('new-votation-page', {'votationPage' : newPoll }); 
//         });
//     }

  });