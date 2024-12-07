// frontend/index.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchRoles, assignRole } from './actions';

const AssignRole = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users || []);
  const roles = useSelector((state) => state.roles);
  const assignmentStatus = useSelector((state) => state.assignmentStatus);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSubmit = () => {
    if (selectedUser && selectedRole) {
      dispatch(assignRole(selectedUser, selectedRole));
    } else {
      alert('Please select both a user and a role.');
    }
  };

  // Function to render users
  const renderUsers = () => {
    const userOptions = [];
    if (Array.isArray(users) && users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        userOptions.push(
          <option key={users[i]._id} value={users[i]._id}>
            {users[i].username}
          </option>
        );
      }
    } else {
      userOptions.push(<option key="no-users">No users found</option>);
    }
    return userOptions;
  };

  // Function to render roles
  const renderRoles = () => {
    const roleOptions = [];
    if (Array.isArray(roles) && roles.length > 0) {
      for (let i = 0; i < roles.length; i++) {
        roleOptions.push(
          <option key={roles[i]._id} value={roles[i]._id}>
            {roles[i].roleName}
          </option>
        );
      }
    }
    return roleOptions;
  };

  return (
    <div>
      <h2>Assign Role</h2>

      <div>
        <label>User:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">--Select User--</option>
          {renderUsers()}
        </select>
      </div>

      <div>
        <label>Role:</label>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">--Select Role--</option>
          {renderRoles()}
        </select>
      </div>

      <button onClick={handleSubmit}>Assign Role</button>
      {assignmentStatus && <p>{assignmentStatus.message}</p>}
    </div>
  );
};

export default AssignRole;
