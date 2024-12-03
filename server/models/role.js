const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  roleName: {
    type: String,
    required: true,
    unique: true,
  },
  permissions: {
    addresses: { type: Boolean, default: false },
    products: { type: Boolean, default: false },
    categories: { type: Boolean, default: false },
    brand: { type: Boolean, default: false },
    users: { type: Boolean, default: false },
    merchant: { type: Boolean, default: false },
    orders: { type: Boolean, default: false },
    reviews: { type: Boolean, default: false },
    wishlist: { type: Boolean, default: false },
  },
});


const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
