const { response } = require('express');
const User = require('../database/models/UserSchema');
const bcrypt = require('bcryptjs');

const getPolls = async(req, res = response) => {
    console.log('GET POLLs ******');
    console.log(req.body);
    res.json({
        ok: true,
        msg:'getPolls'
      });


    // const { email,password } = req.body;
    // try {

    //     const existeEmail = await User.findOne({ email })
    //     if(existeEmail){
    //         return res.status(400).json({
    //             ok: false,
    //             msg: 'El correo ya está registrado'
    //         })
    //     }
    //     const usuario = new User(req.body);
       
    //     // Encriptar contraseña
    //     const salt = bcrypt.genSaltSync();
    //     usuario.password = bcrypt.hashSync( password, salt );

    //     // Guardar usuario en DB
    //     await usuario.save();

    //     // Generar JWT
    //     const token = await generarJWT(usuario.uid);
    //     res.json({
    //         ok: true,
    //         usuario,
    //         token,
    //     });
    // } catch (error){
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: 'Error al crear usuario'
    //     })
    // }
}

module.exports={
    getPolls,
};