import React from 'react';
import { connect } from 'react-redux';
import Content from '../../components/Content';
import Dashboard from '../../components/Dashboard';
import DriverNavigation from './navigation/driverNavigation';

const DriverView = ({ dispatch }) => {
    return (
        <Dashboard>
            <DriverNavigation dispatch={dispatch} />
            <Content>
                <p>Driver site</p>
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

export default connect(mapStateToProps)(DriverView);
