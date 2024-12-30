/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';
import {ROLES} from '../../constants/index';

import CategoryList from '../../components/Manager/CategoryList';
import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import { show } from 'react-notification-system-redux';
import Popover from '../../components/Common/Popover';

class List extends React.PureComponent {

  state = {
    showPopover:false,
    popoverMessage:'',
    target:null,
  };

  componentDidMount() {
    this.props.fetchCategories();
  }


  handleAddAction = (event) => {
    const {user} = this.props;
    if (user.role === ROLES.Distributor) {
      this.setState({
        showPopover:true,
        popoverMessage:'You do not have permission to add categories',
        target:event.target,
      });
      
      event.preventDefault();
      return;
    }
    this.props.history.push('/dashboard/category/add');
  };

  closePopover = () => {
    this.setState({showPopover:false});
  };

  render() {
    const {categories, isLoading } = this.props;
    const {showPopover,popoverMessage,target} = this.state;

    return (
      <>
        {showPopover && (
          <Popover
            target={target}
            popoverTitle="Permission Denied"
          >
            {popoverMessage}
          </Popover>
        )}
        <SubPage
          title='Categories'
          actionTitle='Add'
          handleAction={ (event) =>this.handleAddAction(event)}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : categories.length > 0 ? (
            <CategoryList categories={categories} />
          ) : (
            <NotFound message='No categories found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.category.categories,
    isLoading: state.category.isLoading,
    user: state.account.user
  };
};

export default connect(mapStateToProps, actions)(List);
