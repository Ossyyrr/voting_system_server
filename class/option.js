const { v4:uuidV4 } = require('uuid');
class Option{
    constructor({id= uuidV4(), title = 'no-title'}={}){
                 this.id = id;
                 this.title = title;
                 this.votes = 0;
                 this.votedBy = [];
            }

    getOption(){
        console.log('get options');
       //x return this.option;
    }

}

module.exports=
    Option
;

//  const { v4:uuidV4 } = require('uuid');
//  class Option{
//      constructor({title = 'no-title'}={}){
//          this.id = uuidV4();
//          this.title = title;
//          this.votes = 0;
//          this.votedBy = [];
//      }
//  }
//  module.exports = Option;