const { response } = require('express');
const Users = require('../models/UserSchema');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const crearUsuario = async(req, res=response)=>{
    const { email,password } = req.body;
    try {

        const existeEmail = await Users.findOne({ email })
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }
        const usuario = new Users(req.body);
       
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario en DB
        await usuario.save();

        // Generar JWT
        const token = await generarJWT(usuario.id);
        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario'
        })
    }
}




const login = async(req, res=response)=>{
    const { email, password } = req.body;

    console.log(req.body);

    try{
        const usuarioDB = await Users.findOne({ email });

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'El email no se encuentra'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuarioDB.id);

         res.json({
             ok: true,
             usuarioDB, 
             token,
         });

    }catch(error){
        return res.status(500).json({
            ok:false,
            msg: 'Error en el login',
        });
    }
 
}





module.exports={
    crearUsuario,
    login,
};