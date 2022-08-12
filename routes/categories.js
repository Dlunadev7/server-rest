const { Router } = require('express');
const { check } = require('express-validator');
const { createCategorie, getCategoriePaginate, getCategorie, updateCategorie, deleteCategory } = require('../controllers/categories');
const { categoryExist } = require('../helpers/db-validators');
const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const router = Router();

// Obtener categorias - publico

router.get('/', getCategoriePaginate)

// Obtener una categoria por id - publico

router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( categoryExist ),
  validateFields
], getCategorie)

// Crear categoria - privado - cualquier persona con un token valido

router.post('/', [
   validateJWT,
   check('name', 'El nombre es obligatorio').not().isEmpty(),
   validateFields
  ], createCategorie)

// actualizar - privado - cualquier persona con un token valido

router.put('/:id', [
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( categoryExist ),
  validateFields
],updateCategorie)

// Delete una categoria

router.delete('/:id',[
  validateJWT,
  isAdminRole,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( categoryExist ),
  validateFields
],deleteCategory)



module.exports = router;