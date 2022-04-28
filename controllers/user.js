const { response, request } = require('express');

const userGet = (req, res = response) => {

  const {q, nombre = 'no name', apikey} = req.query;

  res.json({
    msg: 'Get API - controlador',
    nombre,
    apikey
  });
};

const userPost = (req = request, res = response) => {

  const {nombre, edad} = req.body;

  res.json({
    msg: 'Post API - controlador',
    nombre,
    edad
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



