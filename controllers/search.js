const { response } = require("express");

const { ObjectId } = require("mongoose").Types;
const { User, Categorie, Product } = require("../models");

const collectionAllowed = ["users", "categories", "products", "roles"];

const searchUsers = async (term = "", res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const user = await User.findById(term);

    return res.json({
      results: user ? [user] : [],
    });
  }

  const regexp = new RegExp(term, "i");

  const users = await User.find({ 
   $or: [{name: regexp}, {email: regexp}],
   $and: [{state: true}]
  });

  res.json({
    results: users,
  });
};

const searchProducts = async(term, res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const products = await Product.findById(term);

    return res.json({
      results: products ? [products] : [],
    });
  }


  const regexp = new RegExp(term, "i");

  const products = await Product.find({ 
   $or: [{name: regexp}],
  })
  .populate('category', 'name')

  res.json({
    results: products
  })

}

const searchCategories = async(term, res = response) => {
  const isMongoId = ObjectId.isValid(term);

  if (isMongoId) {
    const categories = await Categorie.findById(term);

    return res.json({
      results: categories ? [categories] : [],
    });
  }


  const regexp = new RegExp(term, "i");

  const products = await Categorie.find({ 
   $or: [{name: regexp}],
  })
  .populate('product', 'name')


  res.json({
    results: products
  })

}

const search = (req, res = response) => {
  const { collection, term } = req.params;

  if (!collectionAllowed.includes(collection)) {
    return res.status(400).json({
      msg: `Collection allowed: ${collectionAllowed}`,
    });
  }

  switch (collection) {
    case "users":
      searchUsers(term, res);
      break;

    case "categories":
      searchCategories(term, res);
      break;

    case "products":
      searchProducts(term, res);
      break;

    default:
      res.status(500).json({
        msg: "Se me olvido buscar esta coleccion.",
      });
  }
};

module.exports = {
  search,
};
