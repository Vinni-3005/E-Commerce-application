// actions.js


// actions.js

import axios from 'axios';
import {
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  FETCH_ROLES
} from './constants';
import { API_URL } from '../../constants/constant';

// Action to fetch existing roles
export const fetchRoles = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/roles`);
    console.log('Roles fetched:', response.data);
    dispatch({
      type: FETCH_ROLES,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error fetching roles:', error);
  }
};

// Action to add a new role
export const addRole = (roleData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/roles`, roleData);
    dispatch({
      type: ADD_ROLE,
      payload: response.data.newRole,
    });
  } catch (error) {
    console.error('Error adding role:', error);
  }
};

// Action to edit an existing role
export const editRole = (roleId, roleData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/roles/${roleId}`, roleData);
    dispatch({
      type: EDIT_ROLE,
      payload: response.data,
    });
  } catch (error) {
    console.error('Error updating role:', error);
  }
};

// Action to delete a role
export const deleteRole = (roleId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/roles/${roleId}`);
    dispatch({
      type: DELETE_ROLE,
      payload: roleId,
    });
  } catch (error) {
    console.error('Error deleting role:', error);
  }
};


