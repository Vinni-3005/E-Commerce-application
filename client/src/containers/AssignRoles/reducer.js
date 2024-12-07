// frontend/reducer.js
import { FETCH_USERS, FETCH_ROLES, ASSIGN_ROLE } from './constants';

const initialState = {
  users: [],
  roles: [],
  assignmentStatus: null,
};

const assignRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { 
        ...state, 
        users: Array.isArray(action.payload) ? action.payload : [] };
    case FETCH_ROLES:
      return { ...state, roles: action.payload };
    case ASSIGN_ROLE:
      return { ...state, assignmentStatus: action.payload };
    default:
      return state;
  }
};

export default assignRoleReducer;
