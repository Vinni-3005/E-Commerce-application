// frontend/reducer.js
import { ASSIGN_ROLE } from './constants';

const initialState = {
  users: [],
  roles: [],
  assignmentStatus: null,
};

const assignRoleReducer = (state = initialState, action) => {
  switch (action.type) {
    
    case ASSIGN_ROLE:
      return { ...state, assignmentStatus: action.payload };
    default:
      return state;
  }
};

export default assignRoleReducer;
