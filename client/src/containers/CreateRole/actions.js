/* 

actions



import {
    FETCH_ROLES,
    FETCH_ROLE,
    ROLE_CHANGE,
    ROLE_EDIT_CHANGE,
    SET_ROLE_FORM_ERRORS,
    ADD_ROLE,
    REMOVE_ROLE,
  } from './constants';
  
  export const fetchRoles = () => ({
    type: FETCH_ROLES,
  });
  
  export const fetchRole = (id) => ({
    type: FETCH_ROLE,
    payload: id,
  });
  
  export const roleChange = (data) => ({
    type: ROLE_CHANGE,
    payload: data,
  });
  
  export const roleEditChange = (data) => ({
    type: ROLE_EDIT_CHANGE,
    payload: data,
  });
  
  export const setRoleFormErrors = (errors) => ({
    type: SET_ROLE_FORM_ERRORS,
    payload: errors,
  });
  
  export const addRole = (roleData) => ({
    type: ADD_ROLE,
    payload: roleData,
  });
  
  export const removeRole = (id) => ({
    type: REMOVE_ROLE,
    payload: id,
  });
 
  */