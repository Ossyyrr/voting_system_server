const { v4:uuidV4 } = require('uuid');
const Option = require('../models/option');
const User = require('../database/models/UserSchema');

class Poll{
    constructor( {title, creatorId, isEditable=false, endDate='no-endDate',isMultipleChoice=false, isPrivateVote=false}={}){
        this.id; // Se agrega al crear el objeto en DB
        this.title = title;
        this.options =  [
            new Option( {title:'Bon Jovi'} ),
            new Option( {title:'Rosalia'} ),
        ];
        this.creatorId = creatorId;
        this.activeUsers = [
            new User({id:'S2B2.211203.006',name:'Patri'}),
            new User({id:'S2B2.211203.0062', name:'Alicia'}),
        ];
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