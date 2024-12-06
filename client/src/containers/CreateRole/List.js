/*

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchRoles, deleteRole } from './actions';

class RoleList extends PureComponent {
  componentDidMount() {
    this.props.fetchRoles();
  }

  handleDelete = async (id) => {
    await this.props.deleteRole(id);
  };

  render() {
    const { roles, isLoading } = this.props;

    return (
      <div>
        <h1>Roles</h1>
        <Link to="/add-role">Add Role</Link>
        {isLoading ? (
          <p>Loading...</p>
        ) : roles && roles.length > 0 ? (
          <ul>
            {roles.map((role) => (
              <li key={role._id}>
                {role.roleName}{" "}
                <Link to={`/edit-role/${role._id}`}>Edit</Link>{" "}
                <button onClick={() => this.handleDelete(role._id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No roles found.</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roles: state.role || [],
  isLoading: state.role
});

const mapDispatchToProps = {
  fetchRoles,
  deleteRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(RoleList);
*/