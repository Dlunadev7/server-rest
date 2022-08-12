const { Rol, User, Categorie, Product } = require("../models");



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

const categoryExist = async(id) => {
  const categoryExist = await Categorie.findById(id);

  if( !categoryExist ) {
    throw new Error(`El id ${id} no corresponde a una categoria!`);
  }

}

const productExist = async(id) => {
  const productExist = await Product.findById(id);

  if( !productExist ) {
    throw new Error(`El id ${id} no corresponde a un Producto!`);
  }

}

module.exports = {
  isValidRole,
  validEmail,
  userIdExist,
  categoryExist,
  productExist
}