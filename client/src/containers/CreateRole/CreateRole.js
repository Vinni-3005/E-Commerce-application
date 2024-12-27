
//create role index

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRole, fetchRolesData, editRole, deleteRole } from './actions';
///import EditRole from './Edit';
import {useHistory} from 'react-router-dom';

const CreateRole = () => {
  const [roleName, setRoleName] = useState('');
  const [permissions, setPermissions] = useState({
    AccountSecurity:false,
    address:false,
    products: false,
    category: false,
    brand: false,
    users: false,
    distributor: false,
    orders: false,
    reviews: false,
    wishlist: false,
    createroles: false,
    assignroles: false,
  });
  const [editingRole, setEditingRole] = useState(null); // For editing state

  const dispatch = useDispatch();
  const roles = useSelector((state) => state.roles || []);


  //const rolesList = Array.isArray(roles) ? roles : [];

  useEffect(() => {
    dispatch(fetchRolesData()); // Fetch roles on initial load
  }, [dispatch]);

  const handleToggleChange = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission],
    });
  };

  const handleSubmit = async () => {
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
      AccountSecurity:false,
      address:false,
      products: false,
      category: false,
      brand: false,
      users: false,
      distributor: false,
      orders: false,
      reviews: false,
      wishlist: false,
      createroles: false,
      assignroles: false,
    });
  };

  const handleDelete = (roleId) => {
    dispatch(deleteRole(roleId)); // Dispatch delete action
  };

  const history = useHistory ();

  const handleRedirect = () => {
    history.push('/create-role');
    dispatch(fetchRoles());
  }

  const handleEditRedirect = (roleId) => {
    history.push(`/edit-role/${roleId}`);
  }



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

      <button onClick={handleRedirect}>View Existing roles</button>
      <ul>
        {roles.length > 0 ? (roles.map((role) => (
          <li key={role._id}>
            <span>{role.roleName}</span>
            <span>Permissions: {role.permissions.join(', ')}</span>
            <button onClick={() => handleEditRedirect(role._id)}>Edit</button>
            <button onClick={() => handleDelete(role._id)}>Delete</button>
          </li>
        ))
      ) : (
        <p></p>
      )}
      </ul>
    </div>
  );
};

export default CreateRole;
