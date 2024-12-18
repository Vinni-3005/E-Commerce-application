const express = require('express');
const router = express.Router();
const Role = require('../../models/roles');

// Create or Update Role
router.post('/roles', async (req, res) => {
  const { roleName, permissions } = req.body;

  try {
    // Check if the role already exists
    let role = await Role.findOne({ roleName });

    if (role) {
      // Role already exists, so we just update its permissions
      role.permissions = permissions;  // Update permissions
      await role.save();  // Save the updated role
      return res.json({ msg: 'Role updated successfully', role });
    }

    // If role doesn't exist, create a new one
    role = new Role({
      roleName,
      permissions,
    });

    await role.save();  // Save the new role

    res.status(201).json({ msg: 'Role created successfully', role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Permissions of Existing Role
router.put('/roles/:roleName', async (req, res) => {
  const { roleName } = req.params;
  const { permissions } = req.body;

  try {
    // Find the role by roleName
    const role = await Role.findOne({ roleName });

    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    // Update the permissions of the existing role
    role.permissions = permissions;  // Set the new permissions
    await role.save();  // Save the updated role

    res.json({ msg: 'Role permissions updated successfully', role });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all roles
router.get('/roles', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get specific role by name
router.get('/roles/:roleName', async (req, res) => {
  const { roleName } = req.params;

  try {
    const role = await Role.findOne({ roleName });
    
    if (!role) {
      return res.status(404).json({ msg: 'Role not found' });
    }

    res.json(role);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/permissions', async(req,res) => {
  const {roleName} = req.query;

  try {
    const role = await Role.findOne({roleName});

    if (!role) {
      return res.status(404).json({msg:'Role not found'});
    }

    res.json({permissions:role.permissions});
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
