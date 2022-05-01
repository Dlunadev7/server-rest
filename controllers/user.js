const { response, request } = require('express');

const User = require('../models/user');

const userGet = (req, res = response) => {

  const {q, nombre = 'no name', apikey} = req.query;

  res.json({
    msg: 'Get API - controlador',
    nombre,
    apikey
  });
};

const userPost = async(req = request, res = response) => {

  const body = req.body;

  const usuario = new User(body);

  await usuario.save();

  res.json({
    msg: 'Post API - controlador',
    usuario
  });
};

const userPut = (req, res = response) => {

  const id = req.params.userId;

  res.json({
    msg: 'Put API - controlador',
    id
  });
};

const userPatch = (req, res = response) => {
  res.json({
    msg: 'Patch API - controlador'
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: 'Delete API - controlador'
  });
};




module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
}



