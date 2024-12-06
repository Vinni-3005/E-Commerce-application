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


/*import axios from 'axios';
import {
  FETCH_ROLES,
  FETCH_ROLE_BY_ID,
  ADD_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  SET_LOADING,
  SET_ERRORS
} from './constants';
import { API_URL } from '../../constants/constant';

// Action to fetch all roles
export const fetchRoles = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`/api/roles`); 
    dispatch({
      type: FETCH_ROLES,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message
    });
  } finally {
    dispatch(setLoading(false));
  }
};

// Action to fetch a role by its ID
export const fetchRoleById = (id) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}/roles/${id}`); 
    dispatch({
      type: FETCH_ROLE_BY_ID,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message
    });
  }
};

// Action to add a new role
export const addRole = (roleData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/roles`, roleData);
    dispatch({
      type: ADD_ROLE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message
    });
  }
};

// Action to update an existing role
export const updateRole = (id, updatedRoleData) => async (dispatch) => {
  try {
    const response = await axios.put(`${API_URL}/roles/${id}`, updatedRoleData); 
    dispatch({
      type: UPDATE_ROLE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message
    });
  }
};

// Action to delete a role
export const deleteRole = (id) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/roles/${id}`);
    dispatch({
      type: DELETE_ROLE,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.message
    });
  }
};

// Action to set loading state
export const setLoading = (loadingState) => {
  return {
    type: SET_LOADING,
    payload: loadingState
  };
};

// Action to set error state
export const setErrors = (error) => {
  return {
    type: SET_ERRORS,
    payload: error
  };
};
*/