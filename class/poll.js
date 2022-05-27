const Option = require('../models/optionSchema');

class Poll{
    constructor(){}

    addOption ( option = new Option()){
        console.log('Add option');
        this.options.push(option);
    }

    getOptions(){
        console.log('get options');
        return this.options;
    }

    deleteOption(id=''){
     this.options = this.options.filter(option =>  option.id!==id);
     return this.options;
    }

    voteOption (optionId,userId){
        this.options = this.options.map( option => {
            if(option.id === optionId){
                if(!option.votedBy.includes(userId)){
                    console.log('USER ID: ', userId);
                    option.votedBy.push(userId);
                }
            } else{
                if(!this.isMultipleChoice){
                    if(option.votedBy.includes(userId)){
                        option.votedBy.splice( option.votedBy.indexOf(userId), 1); 
                    }
                }
            }
            option.votes=option.votedBy.length;

          //  console.log('voteOption ********** by',option.votedBy)
          //  console.log('isMultipleChoice',this.isMultipleChoice);
            return option;
        } );
    }

}

module.exports = Poll;