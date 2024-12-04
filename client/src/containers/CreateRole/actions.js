/* 

actions

*/

import axios from 'axios';
//import { API_URL } from '../../../src/constants/constant';
export const createRole = (roleData) => async (dispatch) => {
  try {
      const response = await fetch('http://localhost:3000/api/roles', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(roleData),
      });

      const data = await response.json();

      if (response.status === 201) {
          dispatch({
              type: 'CREATE_ROLE_SUCCESS',
              payload: data.role,
          });
          alert('Role created successfully');
      } else {
          alert(data.message); // Display error message from backend
          dispatch({
              type: 'CREATE_ROLE_FAIL',
              payload: data.message,
          });
      }
  } catch (error) {
      console.error('Error creating role:', error);
      alert('Error creating role');
      dispatch({
          type: 'CREATE_ROLE_FAIL',
          payload: error.message,
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


  