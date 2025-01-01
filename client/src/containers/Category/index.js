/*
 *
 * Category
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import actions from '../../actions';
import { ROLES } from '../../constants';
import List from './List';
import Add from './Add';
import Edit from './Edit';
import Page404 from '../../components/Common/Page404';

class Category extends React.PureComponent {
  render() {
    const { normalizedRole } = this.props;

    return (
      <div className='category-dashboard'>
        <Switch>
          <Route exact path='/dashboard/category' component={List} />
          <Route exact path='/dashboard/category/edit/:id' 
           render = { (props) =>
            normalizedRole === ROLES.Distributor ? (
              <div>You don't have permission to edit categories</div>
            ) : (
              <Edit {...props}/>
            )
           } />
          
          <Route exact path='/dashboard/category/add' 
           render = {(props) => 
            normalizedRole === ROLES.Distributor ? (
              <div>You dont have permission to add categories</div>
            ) : (
              <Add {...props}/>
            )
           } />
          <Route path='*' component={Page404} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(Category);
