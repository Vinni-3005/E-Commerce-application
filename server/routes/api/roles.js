
const express = require('express');
const router = express.Router();
const Role = require('../../models/roles'); // Import the Role model

// Define the route for creating a role
router.post('/roles', async (req, res) => {
  try {
    //console.log(req.body);
    const { roleName, permissions } = req.body;


    // Validate request data
    if (!roleName || !permissions) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create a new role
    const newRole = new Role({
      roleName,
      permissions,
    });

    // Save the role to the database
    await newRole.save();

    // Send a response
    res.status(201).json({ message: 'Role created successfully', newRole });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;

