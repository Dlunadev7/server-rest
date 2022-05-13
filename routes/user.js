
const { Router } = require('express');
const { check } = require('express-validator');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');
const { isValidRole, validEmail, userIdExist } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.get('/', userGet)

router.post('/',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom( validEmail ),
  // check('role', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check('role').custom( isValidRole ),
  validateFields
], userPost)

router.put('/:userId', [
  check('userId', 'No es un id valido').isMongoId(),
  check('userId').custom( userIdExist ),
  // check('role').custom( isValidRole ),
  validateFields
], userPut)

router.delete('/:userId',[
  check('userId', 'No es un id valido').isMongoId(),
  check('userId').custom( userIdExist ),
  validateFields
], userDelete)

router.patch('/', userPatch)

module.exports = router;


