const { response, request } = require('express');
const { Categorie } = require('../models');

// Obtener categorias - paginado - total - populate

const getCategoriePaginate = async(req = request, res = response) => {
  
  const { from = 6, to = 0} = req.params;

  const query = { state: true }

  const [total, categories] = await Promise.all([
    Categorie.countDocuments(query),
    Categorie.find(query).populate('user', 'name')
    .skip(Number(to))
    .limit(Number(from))
  ]);

  res.json({
    total,
    categories
  });
}

// Obtener categorias - total - populate {}

const getCategorie = async(req, res) => {

  const { id } = req.params;

  const categorie = await Categorie.findById(id);

  res.json({
    categorie
  })
}


const createCategorie = async(req, res = response) => {

  const name = req.body.name.toUpperCase();

  const categorieDB = await Categorie.findOne({ name });

  if( categorieDB ) {
    return res.status(400).json({
      msg: `La categoria ${categorieDB.name}, ya existe`
    })
  }

  // Generar la data a guardar

  const data = {
    name,
    user: req.user._id
  }

  const categorie = new Categorie( data );

  // GuardarDB

  await categorie.save();

  res.status(201).json({
    categorie
  })

}

// Actualizar categorias

const updateCategorie = async(req, res = response) => {

  const { id } = req.params;

  const { state, user, ...data } = req.body;

  data.name = data.name.toUpperCase();

  const categorie = await Categorie.findByIdAndUpdate(id, data, { new: true });
  
  res.json(categorie)

}

const deleteCategory = async(req, res = response) => {
  const { id } = req.params;

  const categorie = await Categorie.findOneAndUpdate(id, { state: false });

  res.json(categorie);

} 

// Borrar categorias - estado: false

module.exports = {
  createCategorie,
  getCategoriePaginate,
  getCategorie,
  updateCategorie,
  deleteCategory
}