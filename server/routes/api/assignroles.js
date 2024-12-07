// backend/routes/api/assignroles.js
const express = require('express');
const router = express.Router();
const User = require('../../models/user');   // Assuming User model exists
const Role = require('../../models/roles');   // Assuming Role model exists
const AssignRole = require('../../models/assignroles');  // The AssignRole model

// Route to fetch all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Fetch all users
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
});

// Route to fetch all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();  // Fetch all roles
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles' });
  }
});

// Route to assign role to a user
router.post('/', async (req, res) => {
  const { userId, roleId } = req.body;

  try {
    // Check if user and role exist
    const user = await User.findById(userId);
    const role = await Role.findById(roleId);

    if (!user || !role) {
      return res.status(404).json({ message: 'User or Role not found' });
    }

    // Check if the role is already assigned to the user
    const existingAssignment = await AssignRole.findOne({ userId, roleId });
    if (existingAssignment) {
      return res.status(400).json({ message: 'Role is already assigned to this user' });
    }

    // Create and save the role assignment
    const assignRole = new AssignRole({
      userId,
      roleId
    });

    await assignRole.save();
    res.json({ message: 'Role assigned successfully', assignRole });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning role' });
  }
});

module.exports = router;
