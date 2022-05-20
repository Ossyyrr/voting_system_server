const { v4:uuidV4 } = require('uuid');
const Options = require("./options");


class Poll{
    constructor(id = uuidV4(), title = 'no-name', creatorId='x', isEditable=false, endDate='no-endDate',isMultipleChoice=false,  isPrivateVote=false){
        this.id = id;
        this.title = title;
        this.options =  new Options();
        this.creatorId = creatorId;
        this.isEditable = isEditable;
        this.endDate = endDate;
        this.isMultipleChoice = isMultipleChoice;
        this.isPrivateVote = isPrivateVote;
    }
}

module.exports = Poll;