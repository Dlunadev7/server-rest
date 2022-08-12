const { response, request } = require('express');
const { Product } = require('../models');


const getProductsPaginate = async(req = request, res = response) => {
  
  const { from = 5, to = 0 } = req.params;

  const query = { state: true }

  const [total, product] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).populate('user', 'name')
    .skip(Number(to))
    .limit(Number(from))
  ]);

  res.json({
    total,
    product
  });
}


const getProduct = async(req, res) => {

  const { id } = req.params;

  const product = await Product.findById(id)
                               .populate('user', 'name')
                               .populate('category', 'name')

  res.json({
    product
  })
}


const createProduct = async(req, res = response) => {

  const { state, user, ...body } = req.body;

  const productDB = await Product.findOne({...body.name});

  console.log(req.body.name)
  if( !productDB ) {
    return res.status(400).json({
      msg: `El producto ${productDB.name}, ya existe`
    })
  }


  const data = {
    ...body,
    name: body.name.toUpperCase(),
    user: req.user._id
  }

  const product = new Product( data );

  // GuardarDB

  await product.save();

  res.status(201).json({
    product
  })

}


const updateProduct = async(req, res = response) => {

  const { id } = req.params;

  const { state, user, ...body } = req.body;

  body.name = body.name.toUpperCase();

  const product = await Product.findByIdAndUpdate(id, body, { new: true });
  
  res.json(product)

}

const deleteProduct = async(req, res = response) => {
  const { id } = req.params;

  const product = await Product.findOneAndUpdate(id, { state: false });

  res.json(product);

} 

module.exports = {
  getProductsPaginate,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}
