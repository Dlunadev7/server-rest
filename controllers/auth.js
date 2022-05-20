const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const generateJWT = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async(req, res = response) => {

  const { id_token } = req.body;


  try {
    
    const { name, picture, email } = await googleVerify( id_token );

    let user = await User.findOne({email});

    if( !user ) {
      // Tengo que crearlo

      const data = {
        name,
        img: picture,
        email,
        password: ':P',
        google: true,
        role: 'USER_ROLE'
      }

      user = new User(data)
      await user.save();
    }

    // Si el usuario en DB esta eliminado 

    if(!user.state) {
      return res.status(401).json({
        msg: 'Hable con el administrador - Admin Bloqueado'
      })
    }

    // Generar el JWT

    const token = await generateJWT(user.id);

    console.log(user)

    res.json({
      user,
      token
    })
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }


}

module.exports = {
  login,
  googleSignIn
}