// backend/routes/api/assignroles.js
const express = require('express');
const router = express.Router();
const User = require('../../models/user');   // Assuming User model exists
const Role = require('../../models/roles');   // Assuming Role model exists
const AssignRole = require('../../models/assignroles');  // The AssignRole model


// Route to assign role to a user

router.post('/assignroles', async (req, res) => {
  console.log('Received request body:', req.body);
  const {userId, roleId} = req.body;
  if (!userId || !roleId) {
    return res.status(400).json({message:'userId and roleID are required'})
  }

  try {
    const user = await User.findOne({username: userId});
    if (!user) {
      return res.status(404).json({message:'User not found'});
    }

    const role = await Role.findById(roleId);
    if ( !role) {
      return res.status(404).json({message:'Role not found'});
    }

    const assignRole = new AssignRole({
      userId: user._id,
      roleId: role._id,
    });
    await assignRole.save();  // Save the assignment record

    // Now update the User's roles array
    user.roles.push(role._id);
    await user.save();

    return res.status(200).json({
      message: 'Role assigned successfully',
      userId: user._id,
      roleId: role._id,
    });
  } catch (error) {
    console.error('Error assigning role:', error);
    return res.status(500).json({message:'failed to assign role', error:error.message});
  }
});

module.exports = router;


