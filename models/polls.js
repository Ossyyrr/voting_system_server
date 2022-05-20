const Poll = require("./poll");
const Option = require("./option");
const { v4:uuidV4 } = require('uuid');

class Polls {

    constructor(){
        this.polls = [
            new Poll('1234', 'titulo: 1234'),
            new Poll('aaaa' , 'titulo: aaaa'),
        ];
        // console.log('Polls:', this.polls)
    }


    getPolls (){
    // TODO get polls from DB
    // console.log('this.polls');
    // console.log(this.polls);
    return this.polls;
    }

   addPoll (title ){
        console.log('add votation page **');

        const newPoll= {
            'pollId': uuidV4(),
            'title': title,
            'options':  new Options(),
        };
       this.polls = [
           ...this.polls,
           newPoll,
       ];

       return newPoll;
   }


    existPoll (pollId){
       const sala= this.polls.find(options => options.pollId === pollId);
       console.log('EXISTS VOTATION PAGE ****** SALA:', pollId, (sala !== undefined));
       return sala !== undefined;
    }

    getPoll (pollId){
        console.log('getPoll - PollId: ', pollId);        
        return this.polls.find(poll => poll.id === pollId);
    }

   
}

module.exports = Polls;