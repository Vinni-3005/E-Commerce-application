/*
 *
 * Dashboard reducer
 *
 */

import { TOGGLE_DASHBOARD_MENU, FETCH_USER_PERMISSIONS } from './constants';

const initialState = {
  isMenuOpen: false,
  permissions: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DASHBOARD_MENU:
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      };
    case FETCH_USER_PERMISSIONS:
      return {
        ...state,
        permissions: action.payload,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
