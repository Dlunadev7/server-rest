const Rol = require('../models/role');
const User = require('../models/user');


const isValidRole = async(role = '') => {
  const existRole = await Rol.findOne({role})
  if( !existRole ) {
    throw new Error(`El rol ${role} no esta registrado en DB`);7
  } 
}

const validEmail = async(email = '') => {
  const emailExist = await User.findOne({email});

  if( emailExist ) {
    throw new Error(`El correo ${email} ya se encuentra registrado`);
  }

}

const userIdExist = async(userId) => {
  const userExist = await User.findById(userId);

  if( !userExist ) {
    throw new Error(`El id ${userId} no corresponde a un usuario`);
  }

}

module.exports = {
  isValidRole,
  validEmail,
  userIdExist
}