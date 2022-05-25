const { response } = require('express');
const { validationResult } = require('express-validator');
const UserSchema = require('../models/userSchema');



const crearUsuario= async(req, res=response)=>{
    console.log(req);

    // Guardar usuario en DB
    const usuario = new UserSchema(req.body);
    await usuario.save();


    res.json({
        ok: true,
        body: req.body
    });
}

module.exports={
    crearUsuario,
};