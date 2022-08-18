const { Router } = require('express');
const { check } = require('express-validator');
const { uploadFiles, updateImage, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { collectionAllowed } = require('../helpers');
const validateFile = require('../middlewares/validateFile');
const { validateFields } = require('../middlewares/validate_fields');

const router = Router();

router.post('/', validateFile ,uploadFiles)

router.put('/:collection/:id', [
  check('id', 'El id tiene que ser de Mongo').isMongoId(),
  check('collection').custom( c => collectionAllowed(c, ['users', 'products'])),
  validateFile,
  validateFields
], updateImageCloudinary)

router.get('/:collection/:id', [
  check('id', 'El id tiene que ser de Mongo').isMongoId(),
  check('collection').custom( c => collectionAllowed(c, ['users', 'products'])),
], showImage)

module.exports = router;