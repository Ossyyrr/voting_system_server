
const { Schema, model } = require('mongoose');
// Esquema DB
// TODO Añadir el resto de campos
const UserSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true
    },
    online:{
        type: Boolean,
        default:false        
    },
    avatarId:{
        type: String,
        default:false        
    }, 
    votedPolls:{
        type: [],
        default:false        
    }, 
    myPolls:{
        type: [],
        default:false        
    },
})

// modifica el objeto actual de DB a un objeto sin __v y sin password.
UserSchema.method('toJSON', function(){
    // ...object extrae el resto de propiedades a un objeto llamado object
    const { __v, _id, password, ...object } = this.toObject(); 
    // agrego a object el _id llamándolo uid
    object.uid = _id;
    return object;
});

module.exports = model('Users', UserSchema) // Nombre de la tabla: Users
