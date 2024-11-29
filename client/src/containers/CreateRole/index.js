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
      roleType : '',   // user or merchant
      userName : '',  //user name
      features : [],  //selected features for merchants
    };
  }

  //hhande input change for role name and type
  handleInputChange = (e) => {
    this.setState({[e.target.name]: e.target.value});

    //reset features if role type changes
    if (e.target.name === 'roleType') {
      this.setState ({features :[]});
    }
  };

  //handle checkbox feature selection 
  handleFeatureChange = (feature) => {
    const { features } = this.state;
    if (features.includes(feature)) {
      //remove feature if already selected 
      this.setState({features:features.filter((f) => f !==feature )});
    } else {
      //add feature if not selected
      this.setState( {features: [...features, feature]});
    }
  };

  //handle form submission
  handleSubmit = (e) => {
    e.preventDefault();

    const { userName,roleType, features } = this.state;
    const { createRole } = this.props;

    //validation 
    if (!roleType || !userName) {
      alert('Please fill in the required fields');
      return;
    } 

    if ( roleType === 'merchant' && features.length === 0) {
      alert('Please select atleast one feature for a merchant role');
      return;
    }

    //dispatch action to create role
    createRole({ userName, roleType, features});

    //reset the form after successfull submission
    this.setState( { roleType:'', userName:'', features:[]});
  };


  render () {
    const { userName, roleType, features } = this.state;
    //available features only for merchants
    const merchantFeatures = [
      'Add product',
      'Edit product',
      'Addcategory',
      'Edit category'
    ];

    return (
      <div className='create-roles'>
        <h2>Create a Role</h2>
        <div className='create-roles-form'>
          <form onSubmit = {this.handleSubmit}>
            {/* role type field */}
            <div>
              <label htmlFor='roleType'>Role Type:</label>
              <select
                name = "roleType"
                id = "roleType"
                value = {roleType}
                onChange={this.handleInputChange}
                required
              >
                <option value="">Select Role Type</option>
                <option value="user">User</option>
                <option value="merchant">Merchant</option>
              </select>
            </div>

            <div>
              <label htmlFor='userName'>User name:</label>
              <input 
                type="text"
                name="userName"
                id="userName"
                value={userName}
                onChange={this.handleInputChange}
                placeholder="Enter a user name"
                required
              />
            </div>

            {/* Features selection (visible for merchants) */}
            {roleType === 'merchant' && (
              <div>
                <label>Assign Features:</label>
                {merchantFeatures.map((feature) => (
                  <div key={feature}>
                    <input 
                      type='checkbox'
                      id={feature}
                      value={feature}
                      checked={features.includes(feature)}
                      onChange= { () => this.handleFeatureChange(feature)} 
                    />
                    <label htmlFor={feature}>{feature}</label>
                  </div>
                ))}
              </div>
            )}

            {/* submit button */}
            <button type='submit'>Create Role</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps ={
  createRole : actions.createRole  //redux action for create role 
}

export default connect(null, mapDispatchToProps)(CreateRoles);