const { Router } = require('express');
const { check } = require('express-validator');
const {getPollsFromDB} = require('../controllers/poll');
const router = Router();

// Ruta base:  '/api/poll'

 router.get('/', 
 [ //middlewares
 //check('name', 'el name es obligatorio').not().isEmpty(),
 //check('email', 'el email es obligatorio').isEmail(),
 //check('password', 'el password es obligatorio').not().isEmpty(),
 //validarCampos
 ], 
 getPollsFromDB );


module.exports = router;