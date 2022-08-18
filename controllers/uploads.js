const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

require('dotenv').config();

const cloudinary = require('cloudinary').v2;

cloudinary.config(process.env.CLOUDINARY_URL);

const path = require('path');
const fs = require("fs");

const uploadFiles = async (req, res = response) => {

  try {
    // const nombre = await uploadFile(req.files, ["txt", "md"], 'text');
    const nombre = await uploadFile(req.files, undefined, "imgs");

    res.json({
      nombre,
    });
  } catch (msg) {
    return res.status(400).json({
      msg,
    });
  }
};

const updateImage = async (req, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    case "products":
      model = await Product.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
        collection
      });
  }

  // Limpiar imagenes previas

  if( model.img ) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img);

    if(fs.existsSync(pathImg)) {
      fs.unlinkSync(pathImg)
    }
  }

  const nombre = await uploadFile(req.files, undefined, collection);

  model.img = nombre;

  await model.save();

  res.json(model);

};

const showImage = async(req, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    case "products":
      model = await Product.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
        collection
      });
  }

  // Limpiar imagenes previas

  if( model.img ) {
    const pathImg = path.join(__dirname, '../uploads', collection, model.img);

    if(fs.existsSync(pathImg)) {
      return res.sendFile(pathImg);
    }
  }

  const pathAuxImg = path.join(__dirname, '../assets/no-image.jpg');

  res.sendFile(pathAuxImg);

}


const updateImageCloudinary = async (req, res = response) => {

  const { id, collection } = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await User.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id ${id}`
        })
      }

      break;

    case "products":
      model = await Product.findById(id);
      if(!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id ${id}`
        })
      }

      break;

    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
        collection
      });
  }

  // Limpiar imagenes previas

  if( model.img ) {
    let nameArr = model.img.split('/');
    let name = nameArr[nameArr.length - 1].split('.');
    let publicId = name[0];
  
    cloudinary.uploader.destroy(publicId);
    
  }

  const { tempFilePath } = req.files.archivo;

  const { secure_url } = await cloudinary.uploader.upload(tempFilePath)

  model.img = secure_url;

  await model.save();

  res.json(model)

};

module.exports = { uploadFiles, updateImage, showImage, updateImageCloudinary };
