

import { API_URL } from '../../constants/constant';
import axios from 'axios';
//import {  ASSIGN_ROLE, ASSIGN_ROLE_ERROR } from './constants';
import { ASSIGN_ROLE,ASSIGN_ROLE_ERROR } from './constants';
import { fetchUsers } from '../Users/actions';


// Action to assign role to a user
export const assignRole = (selectedUser, selectedRole) => async (dispatch) => {

  try {
    const payload = {
      username : selectedUser,
      roleName: selectedRole,
    };
    console.log('Payload being sent:', payload);
    const response = await axios.post(`${API_URL}/assignroles`, payload );

    console.log('Role assigned:', response.data);

    dispatch ( {
      type: 'ASSIGN_ROLE',
      payload: response.data,
    });

    return response;
  } catch(error) {
    console.error('Error assigning role:', error.message);
    dispatch( {
      type: 'ASSIGN_ROLE_ERROR',
      payload:error.message,
    });
  }
};