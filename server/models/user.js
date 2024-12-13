const Mongoose = require('mongoose');

const { ROLES, EMAIL_PROVIDER } = require('../constants');

const { Schema } = Mongoose;

// User Schema
const UserSchema = new Schema({
  email: {
    type: String,
    required: () => {
      return this.provider !== 'email' ? false : true;
    }
  },
  phoneNumber: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  password: {
    type: String
  },
  merchant: {
    type: Schema.Types.ObjectId,
    ref: 'Merchant',
    default: null
  },
  provider: {
    type: String,
    required: true,
    default: EMAIL_PROVIDER.Email
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  avatar: {
    type: String
  },
  role: {
    type: String,
    //default: ROLES.Member,
    enum: [ROLES.Admin, ROLES.Member, ROLES.Merchant,'Customer','Admin','Distributor','Manufacturer'],
  },
  
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});


// Static method to assign a new role
UserSchema.statics.assignRole = async function (username, newRole) {
  // Ensure the newRole is valid
  if (!Object.values(ROLES).includes(newRole)) {
    throw new Error('Invalid role specified.');
  }

  // Update the user's role
  const updatedUser = await this.findOneAndUpdate(
    { username }, // Find user by username
    { role: newRole, updated: new Date() }, // Update the role and updated timestamp
    { new: true } // Return the updated user document
  );

  if (!updatedUser) {
    throw new Error('User not found or update failed.');
  }

  return updatedUser;
};
module.exports = Mongoose.model('User', UserSchema);
