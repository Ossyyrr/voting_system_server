const Band = require("./band");
const Bands = require("./bands");

class VotationPages {

    constructor(){
        this.votationPages = [
            {
                'salaId':'1234',
                'bands': new Bands(),
            }
        ];
    }

   addVotationPage ( bands = new Bands(), salaId){
       this.votationPages = [
           ...this.votationPages,
            {
                'salaId': salaId,
                'bands': bands,
            }
       ]
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

    // deleteBand(id=''){
    //  this.bands=   this.bands.filter(band =>  band.id!==id);
    //  return this.bands;
    // }

    // voteBand (id=''){
    //     this.bands = this.bands.map( band => {
    //         if(band.id === id){
    //             band.votes++;
    //             return band;
    //         } 
    //         else {
    //             return band;
    //         }

    //     } );
    // }

}

module.exports = VotationPages;