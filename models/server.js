const express = require('express');
const cors = require('cors');
const { dbConnection, client } = require('../database/config');
require('dotenv').config()


class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // this.usersPath = '/api/users';
    // this.authPath = '/api/auth';

    this.paths = {
      usersPath: '/api/users',
      authPath: '/api/auth',
      products: '/api/products',
      categories: '/api/categories', 
      search: '/api/search'
    }

    // Coneccion a DB

    this.conectarDB()
    
    // Middlewares

    this.middleware();

    // Rutas de mi aplicacion

    this.routes();
  }

  async conectarDB(){
    await dbConnection()
  };

  middleware() {
    // CORS
    this.app.use(cors());

    // Lectura y parseo del body

    this.app.use( express.json() );

    // Directorio publico
    this.app.use(express.static('public'))
  }

  routes() {
   
    this.app.use(this.paths.authPath, require('../routes/auth'));
    this.app.use(this.paths.usersPath, require('../routes/user'));
    this.app.use(this.paths.categories, require('../routes/categories'));
    this.app.use(this.paths.products, require('../routes/products'));
    this.app.use(this.paths.search, require('../routes/search'));

  }

  listen() {    
    this.app.listen(this.port, () => {
      console.log('Servidor corriendo en puerto', this.port)
    })
  }

  
}

module.exports = Server;



