const express = require('express');
require('dotenv').config()
const cors = require('cors');
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';


    // Middlewares

    this.middleware();


    // Rutas de mi aplicacion

    this.routes();
  }

  middleware() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body

    this.app.use( express.json() );

    // Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
   
    this.app.use(this.usersPath, require('../routes/user'))

  }

  listen() {    
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }

  
}

module.exports = Server;



