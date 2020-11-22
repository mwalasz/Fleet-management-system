import React from 'react';
import { connect } from 'react-redux';
import ManagerNavigation from './navigation/managerNavigation';
import Dashboard from '../../components/Dashboard';
import Content from '../../components/Content';

const ManagerView = ({ dispatch }) => {
    return (
        <Dashboard>
            <ManagerNavigation dispatch={dispatch} />
            <Content>
                <p>Manager site</p>
            </Content>
        </Dashboard>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggingOut: state.isLoggingOut,
        logoutError: state.logoutError,
        user: state.user,
    };
};

export default connect(mapStateToProps)(ManagerView);
