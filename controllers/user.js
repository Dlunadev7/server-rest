const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userGet = async(req = request, res = response) => {

  // const {q, nombre = 'no name', apikey} = req.query;

  const { limite = 5, desde = 0 } = req.query;

  const query = { state: true }

  // const users = await User.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await User.countDocuments(query);

  // Codigo Bloqueante que tarda por cada promesa :/

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
    .skip(Number( desde ))
    .limit(Number( limite ))
  ]);

  res.json({
    total,
    users
  });
};

const userPost = async(req = request, res = response) => {

  const { name, email, password, role } = req.body;

  const usuario = new User({
    name,
    email,
    password,
    role
  });

  // Encriptar la contraseña

  const salt = bcryptjs.genSaltSync();

  usuario.password = bcryptjs.hashSync(password, salt)

  // Guardar en DB

  await usuario.save();

  res.json({
    usuario
  });
};

const userPut = async(req, res = response) => {

  const id = req.params.userId;

  const { _id, password, google, email, ...rest } = req.body;

  // Validar contra base de datos

  if( password ) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    rest.password = bcryptjs.hashSync(password, salt)
  
  }

  const user = await User.findByIdAndUpdate( id, rest );

  res.json(user);
};

const userDelete = async(req, res = response) => {

  const id = req.params.userId;

  // Borrar Fisicamente

  // const user = await User.findByIdAndDelete(id)

  const user = await User.findByIdAndUpdate(id, { state: false })

  res.json(user);
};

const userPatch = (req, res = response) => {
  res.json({
    msg: 'Patch API - controlador'
  });
};




module.exports = {
  userGet,
  userPost,
  userPut,
  userPatch,
  userDelete,
}
