const Poll = require("../models/pollSchema");

class Polls {

    constructor(){
        this.polls = [
          //  new Poll(  {title:'1234',creatorId: '4ce2b842891fddc5' ,id:'1234'} ),
          //  new Poll(  {title:'aaa',creatorId: '4ce2b842891fddc52' ,id:'aaa'} ),
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
       
       const newPoll = new Poll(  {title:title,creatorId: creatorId}    );
       this.polls = [
           ...this.polls,
           newPoll,
        ];
        console.log('add poll: ', newPoll);


        // GUARDAR EN DB
        // const pollSchema = new PollSchema({_id:newPoll.id,...newPoll});
        

        console.log('NEW POLL DB *********');
        console.log('newPoll.id');
        console.log(newPoll.id);
        newPoll.save();


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