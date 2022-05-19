const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post('/login',[
  check('email', "Debe ser un correo valido").isEmail(),
  check('password', "La contraseña es obligatoria").not().isEmpty(),
  validateFields
], login);


module.exports = router;