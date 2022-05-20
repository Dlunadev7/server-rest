const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
  role: {
    type: String,
    required: [true, 'El rol es obligatorio'],
    default: 'USER_ROLE'
  }
});

module.exports = model('Rol', RoleSchema)


