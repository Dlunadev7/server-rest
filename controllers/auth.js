const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');

const login = async(req, res = response) => {

  const { email, password } = req.body;

  try {

    // Verificar si el email existe

    const user = await User.findOne({email});

    if( !user ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
      })
    }

    // Si el usuario esta activo

    if( !user.state ) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - state false'
      })
    }


    // Verificar la password

    const validPassword = bcryptjs.compareSync(password, user.password);

    if(!validPassword) {
      return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
      })
    }

    // Generar el JWT

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })

  } catch (error) {
    
    console.log(error);
    
    res.status(500).json({
      msg: "Hable con el admin"
    })

  }

}

module.exports = {
  login
}