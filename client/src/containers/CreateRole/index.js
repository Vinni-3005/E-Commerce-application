/*

CreateRoles page

*/

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

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
                {availableFeatures.map( (feature) => (
                  <div key={feature}>
                    <input
                      type="checkbox"
                      id= { feature }
                      value = {feature}
                      checked = {features.includes(feature)}
                      onChange = {() => this.handleFeatureChange}
                    />
                    <label htmlFor='{feature}'> {feature} </label>
                  </div>
                ))}  
              </div>
              <button type='submit'>Create Role</button>
            </form>
          </div>
        </subpage>

      </div>
    );
  }
}

const mapDispatchToProps ={
  createRole : actions.createRole  //redux action for create role 
}

export default connect(null, mapDispatchToProps)(CreateRoles);