const Poll = require("./poll");

class Polls {

    constructor(){
        this.polls = [
            new Poll(  {title:'1234',creatorId: 'S2B2.211203.006' ,id:'1234'} ),
            new Poll(  {title:'aaa',creatorId: 'S2B2.211203.0062' ,id:'aaa'} ),
            new Poll(  {title:'bbb',creatorId: 'S2B2.211203.0062' ,id:'bbb'} ),
            new Poll(  {title:'ccc',creatorId: 'S2B2.211203.0062' ,id:'ccc'} ),
            new Poll(  {title:'ddd',creatorId: 'S2B2.211203.006' ,id:'ddd'} ),
        ];
        // console.log('Polls:', this.polls)
    }


    getPolls (){
    // TODO get polls from DB
    // console.log('this.polls');
    // console.log(this.polls);
    return this.polls;
    }

   addPoll (title, creatorId){
       
       const newPoll = new Poll(title,creatorId);
       this.polls = [
           ...this.polls,
           newPoll,
        ];
        console.log('add poll: ', newPoll);

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