const jwt = require("jsonwebtoken");

const validarJWT = (req, res, next)=>{
   
    const token = req.header('x-token');


    if(!token){
        res.status(401).json({
            ok:false,
            msg: 'no hay token en la petición'
        });
    }
    try{
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        
        // Establecer en la request el uid
        req.uid = uid;

        next();
    }   catch(error){
        res.status(401).json({
            ok:false,
            msg: 'Error al validar el token'
        });
    }
}

module.exports={
    validarJWT,
}