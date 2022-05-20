const { v4:uuidV4 } = require('uuid');
const Option = require("./option");

class Poll{
    constructor( title, creatorId, isEditable=false, endDate='no-endDate',isMultipleChoice=false,  isPrivateVote=false){
        this.id = uuidV4();
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
        console.log('Add option');
        this.options.push(option);
    }

    getOptions(){
        console.log('get options');
        return this.options;
    }

    deleteOption(id=''){
     this.options=   this.options.filter(option =>  option.id!==id);
     return this.options;
    }

    voteOption (id){

        console.log('Vote option');
        console.log(id);

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