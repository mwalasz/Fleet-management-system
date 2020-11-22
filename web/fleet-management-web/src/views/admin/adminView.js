import React from 'react';
import { connect } from 'react-redux';
import AdminNavigation from './navigation/adminNavigation';
import Dashboard from '../../components/Dashboard';
import Content from '../../components/Content';

const AdminView = ({ dispatch }) => {
    return (
        <Dashboard>
            <AdminNavigation dispatch={dispatch} />
            <Content>
                <p>Admin site</p>
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

export default connect(mapStateToProps)(AdminView);
