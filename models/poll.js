const { v4:uuidV4 } = require('uuid');
const Option = require("./option");

class Poll{
    constructor(id = uuidV4(), title = 'no-name', creatorId='x', isEditable=false, endDate='no-endDate',isMultipleChoice=false,  isPrivateVote=false){
        this.id = id;
        this.title = title;
        this.options =  [
            new Option( 'Bon Jovi' ),
            new Option( 'Rosalia' ),
        ];

        this.creatorId = creatorId;
        this.isEditable = isEditable;
        this.endDate = endDate;
        this.isMultipleChoice = isMultipleChoice;
        this.isPrivateVote = isPrivateVote;
    }


    addOption ( option = new Option()){
        this.options.push(option);
    }

    getOptions(){
        return this.options;
    }

    deleteOption(id=''){
     this.options=   this.options.filter(option =>  option.id!==id);
     return this.options;
    }

    voteOption (id=''){
        this.options = this.options.map( option => {
            if(option.id === id){
                option.votes++;
                return option;
            } 
            else {
                return option;
            }

        } );
    }

}

module.exports = Poll;