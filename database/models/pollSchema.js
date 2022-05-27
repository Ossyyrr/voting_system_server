const { Schema, model } = require('mongoose');
const OptionSchema = require('./optionSchema');
// Esquema DB




const PollSchema = Schema({
    
     
    title:{
        type: String,
        required: true
    },
    options:{
        type: [],
        required: true,
    },
    creatorId:{
        type: String,
        required: true,
    },
    activeUsers:{
        type: [],
        default:[],
    },
    isEditable:{
        type: Boolean,
        required: true,
        default:false,
    },
    endDate:{
        type: String,
        required: true,
        default:'no-endDate',
    },
    isMultipleChoice:{
        type: Boolean,
        required: true,
        default:false,
    },
    isPrivateVote:{
        type: Boolean,
        required: true,
        default:false,
    },
} );

// modifica el objeto actual de DB a un objeto sin __v y sin password.
PollSchema.method('toJSON', function(){
    // ...object extrae el resto de propiedades a un objeto llamado object
    const { __v, _id,  ...object } = this.toObject(); 
    // agrego a object el _id llamándolo uid
    object.id = _id;
    return object;
});


module.exports = model('Polls', PollSchema) // Nombre de la tabla: Polls


