/**
 *
 * Dashboard
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import { ROLES } from '../../constants';
import dashboardLinks from './links.json';
import { isDisabledMerchantAccount } from '../../utils/app';
import Admin from '../../components/Manager/Dashboard/Admin';
import Merchant from '../../components/Manager/Dashboard/Merchant';
import Customer from '../../components/Manager/Dashboard/Customer';
import DisabledMerchantAccount from '../../components/Manager/DisabledAccount/Merchant';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

class Dashboard extends React.PureComponent {
  componentDidMount() {
    this.props.fetchProfile();
  }

  render() {
    const { user, isLoading, isMenuOpen, toggleDashboardMenu } = this.props;

    if (isDisabledMerchantAccount(user))
      return <DisabledMerchantAccount user={user} />;

    
    const normalizedRole = user?.role ? user.role.trim().toUpperCase() : null;

    return (
      <> 
        {isLoading ? (
          <LoadingIndicator inline />
        ) : normalizedRole === ROLES.Admin ? (
          <Admin
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Admin]}
            toggleMenu={toggleDashboardMenu}
          />
        ) : normalizedRole === ROLES.Distributor ? (
          <Distributor
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Distributor]}
            toggleMenu={toggleDashboardMenu}
          />
        ) :  normalizedRole === ROLES.Manufacturer ? (
          <Manufacturer
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Manufacturer]}
            toggleMenu={toggleDashboardMenu}
          />
        ) : (
          <Customer
            user={user}
            isMenuOpen={isMenuOpen}
            links={dashboardLinks[ROLES.Customer]}
            toggleMenu={toggleDashboardMenu}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    isLoading: state.account.isLoading,
    isMenuOpen: state.dashboard.isMenuOpen
  };
};

export default connect(mapStateToProps, actions)(Dashboard);
