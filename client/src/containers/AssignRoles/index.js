import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../Users/actions'; // Import fetchUsers action from the users container
import { fetchRoles } from '../CreateRole/actions';
import { assignRole } from './actions'; // Import necessary actions for roles and role assignment

const AssignRole = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const dispatch = useDispatch();
  const assignmentStatus = useSelector((state) => state.assignmentStatus);
  //const [assignmentStatus, setAssignmentStatus] = useState(null);

  // Get users, roles, and assignment status from Redux state
  const users = useSelector((state) => state.users.users || []); // Fetch users from the Redux store
  const roles = useSelector((state) => state.roles.roles || []); // Default to an empty array if undefined
  

  // Fetch data on component mount
  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users from the API (using the Users container's action)
    dispatch(fetchRoles()); // Assuming this fetches roles for the dropdown
  }, [dispatch]);

  // Generate dropdown options for users
  const renderUserOptions = () => {
    let options = [];
    if (users.length > 0) {
      for (let i = 0; i < users.length; i++) {
        const userName = users[i].firstName || 'Unnamed user';
        options.push(
          <option key={users[i]._id} value={users[i]._id}>
            {userName}
          </option>
        );
      }
    } else {
      options.push(<option key="no-users" disabled>No users available</option>);
    }
    return options;
  };

  // Generate dropdown options for roles
  const renderRoleOptions = () => {
    console.log("Roles Array:", roles);
    if (!Array.isArray(roles) || roles.length === 0) {
      return <option key="no-roles" disabled>No roles available</option>;
    }

    return roles.map((role) => (
      <option key={role._id} value={role._id}>
        {role.roleName || 'Unnamed Role'}
      </option>
    ));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!selectedUser || !selectedRole) {
      alert('Please select both a user and a role.');
      return;
    }
    dispatch(assignRole(selectedUser, selectedRole)); // Dispatch the assignRole action
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






































