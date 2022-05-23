// const User = require("./user");

// class Users {

//     constructor(){
//         this.users = [
//             new User({id:'S2B2.211203.006', name:'Text1'}),
//             new User({id:'S2B2.211203.0062', name:'02'}),
//             new User({id:'S2B2.211203.0063', name:'03'}),
//         ];
//         // console.log('Users:', this.users)
//     }

//     getUsers (){
//     // TODO get users from DB
//     // console.log('this.users');
//     // console.log(this.users);
//     return this.users;
//     }



//    addUser ({userId, userName}={}){
//        // TODO
//     const newUser = new User( {id:userId, name:userName}   );
//     this.users = [
//         ...this.users,
//         newUser,
//      ];
//      console.log('add user: ', newUser);

//         return newUser;
//    }

//     getUser (userId){
//         console.log('getUser - UserId: ', userId);        
//         return this.users.find(user => user.id === userId);
//     }

   
// }

// module.exports = Users;