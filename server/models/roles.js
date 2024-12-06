const Mongoose = require('mongoose');

const { Schema } = Mongoose;

const roleSchema = new Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    type: [String],
    default : [],
    required: true,
  },
});

const Role = Mongoose.model('Role', roleSchema);

module.exports = Role;



