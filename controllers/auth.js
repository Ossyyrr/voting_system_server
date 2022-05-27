const { response } = require('express');
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const createUser = async(req, res=response)=>{
    const { email,password } = req.body;
    try {

        const existeEmail = await User.findOne({ email })
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            })
        }
        const usuario = new User(req.body);
       
console.log('EL USUARIO CREADO', usuario);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar usuario en DB
        await usuario.save();
console.log('GENERAR JWT ***');
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
        const usuario = await User.findOne({ email });
        console.log(usuario);
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no se encuentra'
            })
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'La contraseña no es válida'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id);

         res.json({
             ok: true,
             usuario, 
             token,
         });

    }catch(error){
        return res.status(500).json({
            ok:false,
            msg: 'Error en el login',
        });
    }
 
}


const renewToken = async (req, res = response)=>{
    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await User.findById(uid);

        res.json({
            ok: true,
            usuario, 
            token,
        });
}




module.exports={
    createUser,
    login,
    renewToken,
};