/* 

actions

*/

import axios from 'axios';
import {ROLE_CREATED, ROLE_CREATE_FAILED} from './constants';

export const createRole = (roleData) => async (dispatch) => {
    try {
        //make API req to create a role
        const response = await axios.post('/api/roles', roleData); 

        //dispatch success action
        dispatch({
            type: ROLE_CREATED,
            payload:response.data, // payload contains newly created roles
        });

        // show a success notification
        alert('Role created successfully');
    } catch (error) {
        console.error('Error creating role', error);

        //dispatch failure action
        dispatch ( {
            type:ROLE_CREATE_FAILED,
            payload:error.response?.data?.message || 'Failed to create role',
        });

        //show an error notification
        alert(error.response?.data?.message || 'Failed to create a role');
    }
};