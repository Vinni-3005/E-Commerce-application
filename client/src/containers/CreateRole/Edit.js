/*
 *
 * Role Edit
 *
 

import React from 'react';
import { connect } from 'react-redux';
import { fetchRoleById, updateRole } from './actions';

class EditRole extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      roleName: '',
      permissions: {}
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchRoleById(id).then((data) => {
      this.setState({
        roleName: data.roleName,
        permissions: data.permissions
      });
    });
  }

  handleToggle = (perm) => {
    this.setState((prevState) => ({
      permissions: {
        ...prevState.permissions,
        [perm]: !prevState.permissions[perm]
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { roleName, permissions } = this.state;

    this.props.updateRole(id, { roleName, permissions }).then(() => {
      this.props.history.push('/');
    });
  };

  render() {
    const { roleName, permissions } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Edit Role</h1>
        <div>
          <label htmlFor="roleName">Role Name: </label>
          <input
            type="text"
            id="roleName"
            value={roleName}
            onChange={(e) => this.setState({ roleName: e.target.value })}
            required
          />
        </div>

        <div>
          <h3>Permissions</h3>
          {Object.keys(permissions).map((perm) => (
            <div key={perm}>
              <label style={{ marginRight: '10px' }}>{perm}</label>
              <button
                type="button"
                onClick={() => this.handleToggle(perm)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: permissions[perm] ? 'green' : 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {permissions[perm] ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '20px' }}>
          <button type="submit" style={{ marginRight: '10px' }}>
            Save
          </button>
          <button type="button" onClick={() => this.props.history.push('/')}>
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  fetchRoleById,
  updateRole
};

export default connect(null, mapDispatchToProps)(EditRole);
*/