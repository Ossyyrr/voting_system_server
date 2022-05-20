const Poll = require("./poll");
const Option = require("./option");
const Options = require("./options");
const { v4:uuidV4 } = require('uuid');

class Polls {

    constructor(){
        this.polls = [
            new Poll('1234', 'titulo: 1234'),
            new Poll('aaaa' , 'titulo: aaaa'),
        ];
        console.log('Polls:', this.polls)
    }

   addVotationPage (title ){
        console.log('add votation page **');

        const newVotationPage= {
            'salaId': uuidV4(),
            'title': title,
            'options':  new Options(),
        };
       this.polls = [
           ...this.polls,
           newVotationPage,
       ];

       return newVotationPage;
   }


    existVotationPage (salaId){
       const sala= this.polls.find(options => options.salaId === salaId);
       console.log('EXISTS VOTATION PAGE ****** SALA:', salaId, (sala !== undefined));
       return sala !== undefined;
    }

    getVotationPage (salaId){
        console.log('GET VOTATION PAGE ****** SALA:', salaId);
        console.log(this.polls.find(options => options.salaId === salaId));
        return this.polls.find(options => options.salaId === salaId);
    }

   
}

module.exports = Polls;