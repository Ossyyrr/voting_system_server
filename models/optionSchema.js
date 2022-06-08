 const { Schema, model } = require('mongoose');
const OptionClass = require('../class/option');
// Esquema DB
 const OptionSchema = Schema({
     title:{
         type: String,
         required: true
     },
     votes:{
         type: Number,
         required: true,
         default:0,
     },
     votedBy:{
         type: [],
         default:[],
     },
 })
 // modifica el objeto actual de DB a un objeto sin __v y sin password.
 OptionSchema.method('toJSON', function(){
     // ...object extrae el resto de propiedades a un objeto llamado object
     const { __v, _id,  ...object } = this.toObject(); 
     // agrego a object el _id llamándolo uid
     object.id = _id;
     return object;
 });

 OptionSchema.loadClass(OptionClass); 

 module.exports = model('Options', OptionSchema) // Nombre de la tabla: Options
