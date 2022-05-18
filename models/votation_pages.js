const Band = require("./band");
const Bands = require("./bands");
const { v4:uuidV4 } = require('uuid');

class VotationPages {

    constructor(){
        this.votationPages = [
            {
                'salaId':'1234',
                'title': '1234',
                'bands': new Bands(),
            },
            {
                'salaId':'aaaa',
                'title': 'aaaa',
                'bands': new Bands(),
            }
        ];
    }

   addVotationPage (title ){
        console.log('add votation page **');

        const newVotationPage= {
            'salaId': uuidV4(),
            'title': title,
            'bands':  new Bands(),
        };
       this.votationPages = [
           ...this.votationPages,
           newVotationPage,
       ];

       return newVotationPage;
   }


    existVotationPage (salaId){
       const sala= this.votationPages.find(bands => bands.salaId === salaId);
       console.log('EXISTS VOTATION PAGE ****** SALA:', salaId, (sala !== undefined));
       return sala !== undefined;
    }

    getVotationPage (salaId){
        console.log('GET VOTATION PAGE ****** SALA:', salaId);
        console.log(this.votationPages.find(bands => bands.salaId === salaId));
        return this.votationPages.find(bands => bands.salaId === salaId);
    }

   
}

module.exports = VotationPages;