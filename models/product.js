const { Schema, model } = require('mongoose');

const productSchema = Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  state: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  price: {
    type: Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Categorie',
    required: true
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  available: {
    type: Boolean,
    default: true
  }
});

productSchema.methods.toJSON = function() {
  const { __v, password , state, ...data} = this.toObject();

  return data;
}

module.exports = model('Product', productSchema)


