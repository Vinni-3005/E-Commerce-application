// reducers.js

import {
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  FETCH_ROLES_DATA
} from './constants';

const initialState = {
  roles: [],
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ROLES_DATA:
      return {
        ...state,
        roles: action.payload,
      };
    case ADD_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload],
      };
    case EDIT_ROLE:
      return {
        ...state,
        roles: state.roles.map((role) =>
          role._id === action.payload._id ? action.payload : role
        ),
      };
    case DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role._id !== action.payload),
      };
    default:
      return state;
  }
};

export default roleReducer;

