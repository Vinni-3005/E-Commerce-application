/*import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editRole, fetchRoles } from './actions';
import { useHistory } from 'react-router-dom';

const EditRole = ({ roleId }) => {
  const dispatch = useDispatch();
  const navigate = useHistory();

  const roles = useSelector((state) => state.roles) || [];
  const roleToEdit = roles.find((role) => role._id === roleId);

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

  useEffect(() => {
    if (roleToEdit) {
      setRoleName(roleToEdit.roleName);
      const updatedPermissions = { ...permissions };
      roleToEdit.permissions.forEach((permission) => {
        updatedPermissions[permission] = true;
      });
      setPermissions(updatedPermissions);
    }
  }, [roleToEdit]);

  const handleToggleChange = (permission) => {
    setPermissions({
      ...permissions,
      [permission]: !permissions[permission],
    });
  };

  const handleSave = () => {
    const updatedPermissions = Object.keys(permissions).filter(
      (key) => permissions[key]
    );

    const updatedRoleData = {
      roleName,
      permissions: updatedPermissions,
    };

    dispatch(editRole(roleId, updatedRoleData));
    navigate('/'); // Redirect back to the main role page
  };

  return (
    <div>
      <h2>Edit Role</h2>
      <input
        type="text"
        placeholder="Role Name"
        value={roleName}
        onChange={(e) => setRoleName(e.target.value)}
      />
      <div>
        {Object.keys(permissions).map((permission) => (
          <div key={permission}>
            <label>
              <input
                type="checkbox"
                checked={permissions[permission]}
                onChange={() => handleToggleChange(permission)}
              />
              {permission.charAt(0).toUpperCase() + permission.slice(1)}
            </label>
          </div>
        ))}
      </div>
      <button onClick={handleSave}>Save Changes</button>
    </div>
  );
};

export default EditRole;
*/