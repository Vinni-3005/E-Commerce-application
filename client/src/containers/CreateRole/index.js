/*

Create role index

*/


import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRole } from '../CreateRole/actions'; // Import your action
import '../../../src/styles/_custom.scss';       // Add some CSS for styling toggle buttons

const CreateRole = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    products: false,
    categories: false,
    brand: false,
    users: false,
    merchant: false,
    orders: false,
    reviews: false,
  });

  const dispatch = useDispatch();

  const handleToggleChange = (permission) => {
    setPermissions( (prevPermissions) => ( {
      ...prevPermissions,
      [permission]: !prevPermissions[permission],
    }));
  };

  const handleSubmit = () => {
    if (!roleName) {
      alert('Role name is required');
      return;
    }

    const selectedPermissions = Object.keys(permissions).filter (
      (key) => permissions[key]
    );

    const roleData = {
      roleName,
      permissions: selectedPermissions,
    };

    dispatch(addRole(roleData)); // Dispatch the action

    // Optional: Clear form after submission
    setRoleName('');
    setPermissions({
      products: false,
      categories: false,
      brand: false,
      users: false,
      merchant: false,
      orders: false,
      reviews: false,
    });

  };

  /*const handleSubmit = () => {
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );*/

  return (
    <div>
      <h3>Create Role</h3>
      <div>
        <label>Role Name:</label>
        <input
          type="text"
          id = "roleName"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </div>
      <div>
          <h3>Permissions:</h3>
          <div className="toggle-buttons-container">
            {Object.keys(permissions).map((permission) => (
              <div key={permission} className="toggle-button">
                <label>{permission.charAt(0).toUpperCase() + permission.slice(1)}</label>
                <div
                  className={`toggle-switch ${permissions[permission] ? 'active' : ''}`}
                  onClick={() => handleToggleChange(permission)}
                >
                  <div className='toggle-knob'></div>
                </div>
              </div>
            ))}
          </div>
      </div>
      <button onClick={handleSubmit}>Add Role</button>
    </div>
  );
};

export default CreateRole;
