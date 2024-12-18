/**
 *
 * UserRole
 *
 */

import React from 'react';

import { ROLES } from '../../../constants';
import Badge from '../../Common/Badge';

const UserRole = props => {
  const { className, user } = props;

  const normalizedRole = user?.role ? user.role.trim().toUpperCase() : null;



  return (
    <>
      { normalizedRole === ROLES.Admin ? (
        <Badge variant='primary' className={className}>
          Admin
        </Badge>
      ) : normalizedRole === ROLES.Distributor ? (
        <Badge variant='dark' className={className}>
          Distributor
        </Badge>
      ) : normalizedRole === ROLES.Manufacturer ? (
        <Badge variant='success'className={className}>
          Manufacturer
        </Badge>
      ) :  (
        <Badge className={className}>Customer</Badge>
      )}
    </>
  );
};

UserRole.defaultProps = {
  className: ''
};

export default UserRole;
