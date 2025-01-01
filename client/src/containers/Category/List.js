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


  handleAction = (event) => {
    console.log("handleAction invoked");
    const { normalizedRole } = this.props;
  
    console.log("Normalized Role:", normalizedRole);
  
    if (normalizedRole === "Distributor") {
      console.log("Distributor: blocking navigation to add category");
  
      event.preventDefault();
      event.stopPropagation();
  
      this.setState({
        showPopover: true,
        popoverMessage: 'You do not have permission to add categories',
        target: event.target,
      });
  
      return;
    } else {
      console.log("Distributor: Navigating to Add Category Page");
      this.props.history.push('/dashboard/category/add');
    }
  }
  closePopover = () => {
    this.setState({showPopover:false});
  };

  render() {
    const {categories, isLoading } = this.props;
    const {showPopover,popoverMessage,target} = this.state;

    return (
      <>
        <SubPage
          title='Categories'
          actionTitle='Add'
          handleAction={this.handleAction}
        >
          {isLoading ? (
            <LoadingIndicator inline />
          ) : categories.length > 0 ? (
            <CategoryList categories={categories} />
          ) : (
            <NotFound message='No categories found.' />
          )}

          {showPopover &&  (
            <Popover
              target={target}
              popoverTitle="Permission Denied"
              onClose={this.closePopover}
            >
              {popoverMessage}
            </Popover>
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
    user:state.account.user,
    normalizedRole:state.account.user.role,
  };
};

export default connect(mapStateToProps, actions)(List);
