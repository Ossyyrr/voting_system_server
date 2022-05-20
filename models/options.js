const Option = require("./option");

class Options {

    constructor(){
        this.options = [];
        this.options.push(new Option( 'Bon Jovi' ));
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

module.exports = Options;