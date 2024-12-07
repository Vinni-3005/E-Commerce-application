// backend/models/assignroles.js
const mongoose = require('mongoose');

// Schema for AssignRole
const assignRoleSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
    required: true
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',  // Reference to the Role model
    required: true
  },
}, {
  timestamps: true,  // Automatically create `createdAt` and `updatedAt` fields
});

// Create the model based on the schema
const AssignRole = mongoose.model('AssignRole', assignRoleSchema);

module.exports = AssignRole;
