/*

Add role




import React from 'react';
import {connect} from 'react-redux';
import actions from '../../actions';
import AddRole from '../../components/Manager/AddRole';
import SubPage from '../../components/Manager/SubPage';

class Add extends React.PureComponent {
    render () {
        const {
            history,
            roleFormData,
            formErrors,
            roleChange,
            addRole,
        } = this.props;

        return (
            <SubPage
                title='Create Role'
                actionTitle = 'Cancel'
                handleAction = { () => history.goBack()}
            >
                <AddRole
                    roleFormData={roleFormData}
                    formErrors={formErrors}
                    roleChange={roleChange}
                    addRole= {addRole}
                />
            </SubPage>
        );
    } 
}

const mapStateToProps = (state) => {
    return {
        roleFormData : state.roles.roleFormData,
        formErrors : state.roles.formErrors
    };
};

export default connect(mapStateToProps, actions)(Add)


*/