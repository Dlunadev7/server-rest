const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post('/login',[
  check('email', "Debe ser un correo valido").isEmail(),
  check('password', "La contraseña es obligatoria").not().isEmpty(),
  validateFields
], login);

router.post('/google',[
  check('id_token', "id_token es necesario").not().isEmpty(),
  validateFields
], googleSignIn);


module.exports = router;