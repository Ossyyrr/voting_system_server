
const { Schema, model } = require('mongoose');
// Esquema DB
// TODO Añadir el resto de campos
const userSchema = Schema({
    nombre:{
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

})
module.exports = model('UserSchema', userSchema)
