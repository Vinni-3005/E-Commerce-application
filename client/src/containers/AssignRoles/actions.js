import { API_URL } from '../../constants';
import { FETCH_USERS, FETCH_ROLES, ASSIGN_ROLE } from './constants';

// Action to fetch users
export const fetchUsers = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/users`);  // Change to your API URL
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const data = await response.json();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    console.error('Error fetching users:', error);
    dispatch({ type: FETCH_USERS, payload: [] }); // Handle the error case gracefully
  }
};

// Action to fetch roles
export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/roles`);  // Change to your API URL
    if (!response.ok) {
      throw new Error('Failed to fetch roles');
    }
    const data = await response.json();
    dispatch({ type: FETCH_ROLES, payload: data });
  } catch (error) {
    console.error('Error fetching roles:', error);
    dispatch({ type: FETCH_ROLES, payload: [] }); // Handle the error case gracefully
  }
};

// Action to assign role to a user
export const assignRole = (userId, roleId) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/assignroles`, {  // Change to your API URL
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, roleId }),
    });
    if (!response.ok) {
      throw new Error('Failed to assign role');
    }
    const data = await response.json();
    dispatch({
      type: ASSIGN_ROLE,
      payload: { userId, roleId },
    });
    dispatch(setAssignmentStatus('Role assigned successfully!')); // Update status after successful role assignment
  } catch (error) {
    console.error('Error assigning role:', error);
    dispatch(setAssignmentStatus('Failed to assign role.')); // Update status on failure
  }
};