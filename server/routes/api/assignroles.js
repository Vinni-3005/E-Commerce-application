// backend/routes/api/assignroles.js
const express = require('express');
const router = express.Router();
const User = require('../../models/user');   // Assuming User model exists
const Role = require('../../models/roles');   // Assuming Role model exists
const AssignRole = require('../../models/assignroles');  // The AssignRole model


// Route to assign role to a user

router.post('/assignroles', async (req, res) => {
  console.log('Received request body:', req.body);
  const {username, roleName} = req.body;
  if (!username || !roleName) {
    return res.status(400).json({message:'userId and roleID are required'})
  }

  try {
    const user = await User.findOneAndUpdate(
      {username},
      {role:roleName},
      {new:true}
    );
    if (!user) {
      return res.status(404).json({message:'User not found'});
    }

    console.log('Updated User:', user);

    /* role = await Role.findOneAndUpdate({roleName});
    if ( !role) {
      return res.status(404).json({message:'Role not found'});
    }*/

    return res.status(200).json({
      message: 'Role assigned successfully',
      updatedUser: { username: user.username, role: user.role },
    });
  } catch (error) {
    console.error('Error assigning role:', error);
    return res.status(500).json({message:'failed to assign role', error:error.message});
  }
});

module.exports = router;


