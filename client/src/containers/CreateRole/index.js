// src/pages/CreateRole.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/_custom.scss';
import { useDispatch } from 'react-redux';
import { createRole } from './actions';

const CreateRole = () => {
  const dispatch = useDispatch();

  // State variables for storing role name and permissions
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    addresses: false,
    products: false,
    categories: false,
    brand: false,
    users: false,
    merchant: false,
    orders: false,
    reviews: false,
    wishlist: false,
  });

  // Function to handle toggle button change
  const handleToggleChange = (e) => {
    const { name } = e.target;
    setPermissions({
      ...permissions,
      [name]: !permissions[name], // Toggle the permission value
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    /*try {
      const response = await axios.post('/api/roles', {
        roleName,
        permissions,
      }); */

      dispatch(createRole(roleName,permissions));

      // reset form
      setRoleName('');
      setPermissions({
        addresses: false,
        products: false,
        categories: false,
        brand: false,
        users: false,
        merchant: false,
        orders: false,
        reviews: false,
        wishlist: false,
      });
    };
      /*catch (error) {
        console.error('Error creating role:', error);
        alert('Failed to create role');
      }*/

  return (
    <div>
      <h2>Create Role</h2>
      <form onSubmit={handleSubmit}>
        {/* Input for role name */}
        <div>
          <label>Role Name:</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            required
          />
        </div>

        {/* Toggle buttons for permissions */}
        <div>
          <h3>Permissions:</h3>
          <div className="toggle-buttons-container">
            {Object.keys(permissions).map((perm) => (
              <div key={perm} className="toggle-button">
                <label>{perm.charAt(0).toUpperCase() + perm.slice(1)}</label>
                <div
                  className={`switch-checkbox-input ${
                    permissions[perm] ? 'checked' : ''
                  }`}
                  onClick={() => handleToggleChange({ target: { name: perm } })}
                >
                  <span className="switch-label">
                    <span className="switch-label-toggle"></span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button type="submit">Add Role</button>
      </form>
    </div>
  );
};

export default CreateRole;
