// frontend/index.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, fetchRoles, assignRole } from './actions';

const AssignRole = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const roles = useSelector(state => state.roles);
  const assignmentStatus = useSelector(state => state.assignmentStatus);

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

  return (
    <div>
      <h2>Assign Role</h2>

      <div>
        <label>User:</label>
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">--Select User--</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.username}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Role:</label>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option value="">--Select Role--</option>
          {roles.map((role) => (
            <option key={role._id} value={role._id}>{role.roleName}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSubmit}>Assign Role</button>
      {assignmentStatus && <p>{assignmentStatus.message}</p>}
    </div>
  );
};

export default AssignRole;
