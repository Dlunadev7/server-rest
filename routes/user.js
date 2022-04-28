
const { Router } = require('express');
const { userGet, userPost, userPut, userPatch, userDelete } = require('../controllers/user');

const router = Router();

router.get('/', userGet)

router.post('/', userPost)

router.put('/:userId', userPut)

router.delete('/', userDelete)

router.patch('/', userPatch)

module.exports = router;


