const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProductsPaginate, getProduct, updateProduct, deleteProduct } = require('../controllers/products');
const { categoryExist, productExist } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const router = Router();

// Obtener categorias - publico

router.get('/', getProductsPaginate)

// Obtener una categoria por id - publico

router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  // check('id').custom( categoryExist ),
  validateFields
], getProduct)

// Crear categoria - privado - cualquier persona con un token valido

router.post('/', [
   validateJWT,
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   validateFields
  ], createProduct)

// actualizar - privado - cualquier persona con un token valido

router.put('/:id', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( productExist ),
  validateFields
],updateProduct)

// Delete una categoria

router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( productExist ),
  validateFields
],deleteProduct)



module.exports = router;