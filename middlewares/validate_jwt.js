const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async(req = request, res = response, next) => {

  const token = req.header('x-token');

  if( !token ) {
    return res.status(401).json({
      msg: "No hay token en la peticion"
    })
  }

  try {
    

    const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY )

    const dataUser = await User.findById({_id: uid});

    if( !dataUser ) {
      return res.status(401).json({
        msg: "Token no valido - usuario no existe en DB"
      })
    }

    // Verificar si el uid tiene estado en true

    if( !dataUser.state ){
      return res.status(401).json({
        msg: "Token no valido - usuario con estado: false"
      })
    }
    
    req.user = dataUser;

    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Token no valido'
    })
  }

}

module.exports = { validateJWT };
