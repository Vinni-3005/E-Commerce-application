/* 

actions

*/

//import axios from 'axios';

import axios from 'axios';
import { ADD_ROLE_SUCCESS, ADD_ROLE_FAILURE } from './constants';
import { API_URL } from '../../constants/constant';

export const addRole = (roleData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/roles`, roleData);
    console.log('Role added:' , response.data);
    dispatch({
      type: ADD_ROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ROLE_FAILURE,
      payload: error.response.data.message || 'An error occurred',
    });
  }
};































/*export const createRole = async (roleData) => {
  try {
    //make post req to backend to create role
    const response = await fetch(`${API_URL}/roles` , {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(roleData,)
    });


    if ( !response.ok) {
      const errorResponse = await response.json();
      throw new error (errorResponse.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    console.log('Role created successfully', data);
    return data;
  } catch (error) {
    console.log('Error creating role', error);
    throw error;
  }
};*/


  