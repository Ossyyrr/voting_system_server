const { Router } = require('express');
const { crearUsuario ,login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validate_fields');
const { validarJWT } = require('../middlewares/validar_jwt');

const router = Router();

// Ruta base:  /api/login

router.post('/new', 
[ //middlewares
check('nombre', 'el nombre es obligatorio').not().isEmpty(),
check('email', 'el email es obligatorio').isEmail(),
check('password', 'el password es obligatorio').not().isEmpty(),
validarCampos
], 
crearUsuario );


router.post('/', 
[ //middlewares
check('email', 'el email es obligatorio').isEmail(),
check('password', 'el password es obligatorio').not().isEmpty(),
], 
login )

router.get('/renew', 
[ //middlewares
validarJWT
], 
renewToken )


module.exports = router;