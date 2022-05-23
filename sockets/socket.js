const { io } = require('../index.js');
const Option = require('../models/option.js');
const Polls = require('../models/polls.js');

const polls = new Polls();

// Mensajes de sockets
// Client es el cliente que consulta al servidor. io es la llegada y retorno de salida del servidor
io.on('connection', client => {
    console.log('Cliente conectado');

    // USO client.id para las salas
    // console.log('clientId : ', client.id);
    console.log('userId : ', client.handshake.headers.userid);

    // !  io.emit                ->  Emite un mensaje a todos los clientes conectados
    // !  client.broadcast.emit  ->  Emite a todos menos al que lo envía
    // !  client.emit            ->  Devuelve información al cliente que se conecta
    // !  client.on              ->  Recive una emisión de un cliente

    // Al conectarse un cliente al servidor. Se devuelve a ese cliente:
    client.emit('polls', polls.getPolls());

    client.on('join-poll', (payload)=>{
      console.log('join - poll', payload);
      client.join(payload.pollId);
      const poll= polls.getPoll(payload.pollId);
      io.to(poll.id).emit('active-options', poll.getOptions()); 
    });

    client.on('leave-poll', (payload)=>{
      console.log('leave - poll', payload);
      client.leave(payload.pollId);
    });

    client.on('add-poll', (payload)=>{
      const poll= polls.addPoll(payload.pollName,payload.creatorId);

      console.log('POLL NAME: ', payload)

      io.emit('polls', polls.getPolls());
      // io.to(client.handshake.headers.sala).emit('polls', polls.getPolls());
    });

    client.on('add-option', (payload)=>{
      const poll= polls.getPoll(payload.pollId);
      poll.addOption(new Option(payload.optionName))
      // TODO users
      console.log('pollId:', poll.id);
      io.to(poll.id).emit('active-options', poll.getOptions()); 
    });

    client.on('vote-option', (payload)=>{
      const poll= polls.getPoll(payload.pollId);
      poll.voteOption( payload.optionId);
      io.to(poll.id).emit('active-options', poll.getOptions()); 
    });

  });