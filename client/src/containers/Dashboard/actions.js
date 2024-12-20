/*
 *
 * Dashboard actions
 *
 */

import { TOGGLE_DASHBOARD_MENU } from './constants';
//import { fetchRolesData } from '../CreateRole/actions';

export const toggleDashboardMenu = () => {
  return {
    type: TOGGLE_DASHBOARD_MENU
  };
};


