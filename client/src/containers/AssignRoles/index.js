import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Users/actions'; // Import fetchUsers action from the users container
import { fetchRolesData } from '../CreateRole/actions';
import { assignRole } from './actions'; // Import necessary actions for roles and role assignment

const AssignRole = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [message, setMessage] = useState(''); // State for the message bo
  const dispatch = useDispatch();
  const assignmentStatus = useSelector((state) => state.assignmentStatus);
  //const [assignmentStatus, setAssignmentStatus] = useState(null);

  // Get users, roles, and assignment status from Redux state
  const users = useSelector((state) => state.users.users || []); // Fetch users from the Redux store
  const roles = useSelector((state) => state.roles.roles || []); // Default to an empty array if undefined
  

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users from the API (using the Users container's action)
    dispatch(fetchRolesData()); // Assuming this fetches roles for the dropdown
  }, [dispatch]);

  const  renderUserOptions = () => {
    if (users.length === 0) {
      return <option key="no users" disabled>No users available</option>;
    }

    return users.map((user, index) => {
      const fullName= `${user.firstName || 'Unnamed'} ${user.lastName || ''}`.trim();
      return (
        <option key={user._id || index} value={user.username || fullName}>
          {fullName}
        </option>
      );
    });
  };

  const renderRoleOptions = () => {
    return roles.length > 0 ? (
      roles.map((role) => (
        <option key={role.roleName || index} value={role.roleName}>
          {role.roleName || 'Unnamed Role'}
        </option>
      ))
    ) : (
      <option key="no-roles" disabled>
        No roles available
      </option>
    );
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedUser || !selectedRole) {
      alert('Please select both a user and a role.');
      return;
    }
    dispatch(assignRole(selectedUser, selectedRole)).then( () => {
      alert(`Role '${selectedRole}' assigned successfully to '${selectedUser}'`);
    }); // Dispatch the assignRole action
  };

  return (
    <div>
      <h2>Assign Role</h2>

      {/* Dropdown for Users */}
      <div>
        <label>User:</label>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">--Select User--</option>
          {renderUserOptions()} {/* Render user options */}
        </select>
      </div>

      {/* Dropdown for Roles */}
      <div>
        <label>Role:</label>
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
        >
          <option value="">--Select Role--</option>
          {renderRoleOptions()} {/* Render role options */}
        </select>
      </div>

      {/* Submit Button */}
      <button onClick={handleSubmit}>Assign Role</button>

    </div>
  );
};

export default AssignRole;






































