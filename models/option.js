const { v4:uuidV4 } = require('uuid');


class Option{
    constructor(title = 'no-name'){
        this.id = uuidV4();
        this.title = title;
        this.votes = 0;
        this.votedBy = [];
    }
}

module.exports = Option;