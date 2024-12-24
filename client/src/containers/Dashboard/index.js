/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { API_URL, ROLES } from '../../constants';
//import dashboardLinks from './links.json';
import { isDisabledMerchantAccount, isProviderAllowed } from '../../utils/app';
import Admin from '../../components/Manager/Dashboard/Admin';
import Merchant from '../../components/Manager/Dashboard/Merchant';
import Customer from '../../components/Manager/Dashboard/Customer';
import DisabledMerchantAccount from '../../components/Manager/DisabledAccount/Merchant';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import AccountMenu from '../../components/Manager/AccountMenu';
import { fetchRolesData } from '../CreateRole/actions';
//import { API_URL } from '../../constants';

class Dashboard extends React.PureComponent {
  state = {
    rolePermissions: null,
  };
  componentDidMount() {
    this.props.fetchProfile();
    this.fetchRolePermissions();
  }

  fetchRolePermissions = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/roles');
      const data = await response.json();
      this.setState({rolePermissions: data});
      console.log('Fetched Role Permissions:', data);
    } catch (error) {
      console.log("Error fetching role permissions", error);
    }
  };

  render() {
    const { user, isLoading, isMenuOpen,  toggleDashboardMenu } = this.props;
    const {rolePermissions} = this.state;

    if (!rolePermissions || isLoading) {
      return <LoadingIndicator inline/>;
    }

    const normalizedRole = user?.role ? user.role.trim().toUpperCase() : null;
    console.log('Normalized User Role:', normalizedRole);

    const roleData = rolePermissions.find(role=> role.roleName.toUpperCase() === normalizedRole);
    console.log('Role Data Found:', roleData);

    if (!roleData) {
      console.error('Role not found in fetched role permissions.');
      return <LoadingIndicator inline/>;
    }

    const menuItems = this.generateMenuItems(roleData.permissions);
    
    return (
      <>
        {isDisabledMerchantAccount(user) ? (
          <DisabledMerchantAccount user={user} />
        ) : normalizedRole === ROLES.Admin ? (
          <Admin
            user={user}
            isMenuOpen={isMenuOpen}
            menuItems = {menuItems}
            toggleMenu = {toggleDashboardMenu}
          />
        ) : normalizedRole === ROLES.Distributor ? (
          <Distributor
            user={user}
            isMenuOpen = {isMenuOpen}
            menuItems= {menuItems}
            toggleMenu={toggleDashboardMenu}
          />
        ) : normalizedRole === ROLES.Manufacturer ? (
          <Manufacturer
            user={user}
            isMenuOpen={isMenuOpen}
            menuItems= {menuItems}
            toggleMenu={toggleDashboardMenu}
          />
        ) : (
          <Customer
            user={user}
            isMenuOpen={isMenuOpen}
            menuItems= {menuItems}
            toggleMenu={toggleDashboardMenu}
          />
        )}
      </>
    );
  }

  generateMenuItems = (permissions) => {
    const menuItems = [];
    const permissionMap = {
      address:"Address",
      security:"AccountSecurity",
      products:"Products",
      categories:"Categories",
      brand:"Brand",
      users:"Users",
      merchant:"Merchants",
      orders:"Orders",
      reviews:"Reviews",
      wishlist:"Wishlist",
      createroles:"Create Roles",
      assignroles: "Assign Roles",
      support:"Support",
    };

    permissions.forEach((permission) => {
      if (permissionMap[permission]) {
        if (permission === "security" && !isProviderAllowed(this.props.user.provider)) {
          return;
        }
        menuItems.push({
          to:`/dashboard/${permission}`,
          name:permissionMap[permission],
          prefix:'/dashboard',
        });
      }
    });
    return menuItems;
  }
}

const mapStateToProps = (state) => ({
  user: state.account.user,
  isLoading: state.account.isLoading,
  isMenuOpen: state.dashboard.isMenuOpen,
});

export default connect(mapStateToProps,actions)(Dashboard);


  