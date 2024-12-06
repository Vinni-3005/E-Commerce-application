
//create role index

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRole, fetchRoles, editRole, deleteRole } from './actions';

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
  const [editingRole, setEditingRole] = useState(null); // For editing state

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles) || [];

  useEffect(() => {
    dispatch(fetchRoles()); // Fetch roles on initial load
  }, [dispatch]);

  const handleToggleChange = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission],
    });
  };

  const handleSubmit = () => {
    const selectedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );

    const roleData = {
      roleName,
      permissions: selectedPermissions,
    };

    if (editingRole) {
      // Update existing role
      dispatch(editRole(editingRole._id, roleData));
      setEditingRole(null); // Reset editing state after updating
    } else {
      // Add new role
      dispatch(addRole(roleData));
    }

    // Clear form fields after submit
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

  const handleEdit = (role) => {
    setRoleName(role.roleName);
    const updatedPermissions = { ...permissions };
    role.permissions.forEach((permission) => {
      updatedPermissions[permission] = true;
    });
    setPermissions(updatedPermissions);
    setEditingRole(role);
  };

  const handleDelete = (roleId) => {
    dispatch(deleteRole(roleId)); // Dispatch delete action
  };

  return (
    <div className='create-role-container'>
      <h3>Create Role</h3>
      <div>
        <label>Role Name:</label>
        <input
          type="text"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
        />
      </div>
      <div>
        <div className='permissions-container'>
          <h4>Permissions:</h4>
          {Object.keys(permissions).map((permission) => (
            <div key={permission}>
              <label>{permission.charAt(0).toUpperCase() + permission.slice(1)}</label>
              <div
                className={`switch-checkbox-input ${permissions[permission] ? 'checked' : ''}`}
                onClick={() => handleToggleChange(permission)}
              >
                <span className="switch-label">
                  <span className="switch-label-toggle"></span>
                </span>
              </div>
           </div>
          ))}
        </div>   
      </div><br></br>
      <button onClick={handleSubmit}>
        {editingRole ? 'Update Role' : 'Add Role'}
      </button>

      <h3> View Existing Roles</h3>
      <ul>
        {roles.map((role) => (
          <li key={role._id}>
            <span>{role.roleName}</span>
            <span>Permissions: {role.permissions.join(', ')}</span>
            <button onClick={() => handleEdit(role)}>Edit</button>
            <button onClick={() => handleDelete(role._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateRole;
