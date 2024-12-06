/*
 *
 * Add
 *
 

import React from 'react';
import { connect } from 'react-redux';
import actions from '../../actions';
//import AddRoleForm from '../../components/Manager/AddRole';
import SubPage from '../../components/Manager/SubPage';

class AddRole extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      permissions: {
        product: false,
        categories: false,
        brands: false,
        reviews: false,
      },
    };
  }

  handleToggle = (perm) => {
    this.setState((prevState) => ({
      permissions: {
        ...prevState.permissions,
        [perm]: !prevState.permissions[perm],
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addRole, history, roleFormData } = this.props;
    const { permissions } = this.state;

    const newRole = {
      ...roleFormData,
      permissions,
    };

    addRole(newRole);
    history.push('/');
  };

  render() {
    const { history, roleFormData, formErrors, roleChange } = this.props;
    const { permissions } = this.state;

    return (
      <SubPage
        title="Create Role"
        actionTitle="Cancel"
        handleAction={() => history.goBack()}
      >
        <AddRoleForm
          roleFormData={roleFormData}
          formErrors={formErrors}
          roleChange={roleChange}
          handleSubmit={this.handleSubmit}
          permissions={permissions}
          handleToggle={this.handleToggle}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = (state) => ({
  roleFormData: state.roles.roleFormData,
  formErrors: state.roles.formErrors,
});

export default connect(mapStateToProps, actions)(AddRole);
*/