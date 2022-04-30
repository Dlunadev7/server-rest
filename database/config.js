const mongoose = require('mongoose');

const dbConnection = async() => {

  const URI = `mongodb+srv://user_node_coffe:${encodeURIComponent("HAzc#tD.JQ83!bm")}@my-cluster-coffe.5x36z.mongodb.net/coffeDB?retryWrites=true&w=majority`;

  try {
    
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Base de datos online');

  } catch (error) {
    console.log(error)
    throw new Error('Error a la horade iniciar la base de datos')
  }

}

module.exports = {
  dbConnection
}