/*

CreateRoles page

*/

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';
import subpage from '../../components/Manager/SubPage';

class CreateRoles extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      roleName : ' ',
      feature: []
    };
  }

  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  handleFeatureChange = (feature) => {
    const { features } = this.state;
    if (features.include(feature)) {
      this.setState({features:feature.filter( (f) => f !==feature )});
    } else {
      this.setState( {features: [...features, feature]});
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { roleName,features } = this.state;
    const { createRole } = this.props;

    if( roleName && features.lenght > 0 ) {
      createRole ( { roleName, features });
      this.setState( {roleName: '', features: []}); //reset form fater submission 
    } else {
      alert("Please fill in the required fields");
    }
  };

  render () {
    const { roleName, features } = this.state;
    const availableFeatures = [
      'Add product',
      'Edit product',
      'Addcategory',
      'Edit category'
    ];

    return (
      <div className='Creat-roles'>
        <subpage title = {'Create Roles'} isMenuOpen = {null}>
          <div className='create-roles-form'>
            <h4>Create a Role</h4>
            <form onSubmit={this.handleSubmit}>
              <div>
                <lable htmlFor = "roleName" > Role Name: </lable>
                <input
                  type="text"
                  name="roleName"
                  id="roleName"
                  value={roleName}
                  onChange = {this.handleInputChange}
                  placeholder = "Enter a role name"
                  required
                />
              </div>

              <div>
                <label>Assign features:</label>
                <input
                  type="checkbox"
                  id= { feature }
                  value = {feature}
                  checked = {features.includes(feature)}
                  onChange = {() => this.handleFeatureChange}
                />
              </div>
            </form>
          </div>
        </subpage>

      </div>
    )
  }


}