const express = require('express');
const Role = require('../../models/role');

const router = express.Router();

router.post('/', async (req, res) => {
    const { roleName, permissions } = req.body;

    const existingRole = await Role.findOne({roleName});    
    if ( existingRole ) {
        return res.status(400).json ( {message: 'Role name already exists' });
    } 

    try {
        const newRole = new Role ( {
            roleName,
            permissions,
        });

        await newRole.save();

        res.status(201).json ( { message: 'Role created successfully' });
    } catch (error) {
        console.error('Error creating role:', error);
        res.status(400).json ( { message : 'Failed to create role', error: error.message });
    }
});

module.exports = router;


