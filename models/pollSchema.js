const { Schema, model } = require('mongoose');
const Poll = require('../class/poll');
const Options = require('../class/option');
// Esquema DB

const PollSchema = Schema({
    title:{
        type: String,
        required: true
    },
   options:{
       type: [
        // {
        //     id:{
        //         type: String,
        //         required: true
        //     },
        //     title:{
        //         type: String,
        //         required: true
        //     },
        //     votes:{
        //         type: Number,
        //         required: true,
        //         default:0,
        //     },
        //     votedBy:{
        //         type: [],
        //         default:[],
        //     },
        // }
        
       ],
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

PollSchema.loadClass(Poll); 

// console.log('*******-********');   
// console.log(PollSchema.methods);    
// console.log(PollSchema.statics);    
// console.log(PollSchema.virtuals);   

module.exports = model('Polls', PollSchema) // Nombre de la tabla: Polls


