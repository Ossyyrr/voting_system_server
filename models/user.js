class User{
    constructor({id, name='no-name', avatarId = 'no-avatar'}={}){
        this.id =id;
        this.name = name;
        this.avatarId = avatarId;
        this.votedPolls = ['aaa'];
        this.myPolls = ['1234'];
    }
}

module.exports = User;

