
var initSokets= async()=>{


const { io } = require('../index.js');
const Polls = require('../class/polls.js');
const Option = require('../models/optionSchema');
const initialPolls = await require('../controllers/poll').getPollsFromDB();


console.log('initialPolls');
console.log(initialPolls);


// TODO Traer polls de este usuario de la DB
const polls = new Polls(initialPolls);

// Mensajes de sockets
// Client es el cliente que consulta al servidor. io es la llegada y retorno de salida del servidor
io.on('connection', client => {
    console.log('Cliente conectado');

    // USO client.id para las salas
    // console.log('clientId : ', client.id);
    console.log('userId : ', client.handshake.headers.userid);
    const userId=client.handshake.headers.userid;

    // !  io.emit                ->  Emite un mensaje a todos los clientes conectados
    // !  client.broadcast.emit  ->  Emite a todos menos al que lo envía
    // !  client.emit            ->  Devuelve información al cliente que se conecta
    // !  client.on              ->  Recive una emisión de un cliente

    // Al conectarse un cliente al servidor. Se devuelve a ese cliente:
    client.emit('polls', polls.getPolls());

    client.on('join-poll', (payload)=>{
      console.log('join - poll', payload);
      client.join(payload.pollId);
      const  poll= polls.getPoll(payload.pollId);
      io.to(poll.id).emit('active-options', poll.getOptions()); 
    });

    client.on('leave-poll', (payload)=>{
      console.log('leave - poll', payload);
      client.leave(payload.pollId);
    });

    client.on('add-poll', (payload)=>{
      polls.addPoll(payload.pollName,payload.creatorId);
      io.emit('polls', polls.getPolls());
      // io.to(client.handshake.headers.sala).emit('polls', polls.getPolls());
    });

    client.on('add-option', (payload)=>{
      console.log('add option -------');

      const poll= polls.getPoll(payload.pollId);
      poll.addOption(new Option({title:payload.optionName}))
      // TODO users
      console.log('pollId:', poll.id);
      io.to(poll.id).emit('active-options', poll.getOptions()); 
    });

    client.on('vote-option', (payload)=>{
      const poll= polls.getPoll(payload.pollId);
      poll.voteOption( payload.optionId , userId);
      io.to(poll.id).emit('active-options', poll.getOptions()); 
    });

  });
}


module.exports={
  initSokets
}