import React from 'react';
import { connect } from 'react-redux';
import DriverNavigation from './navigation/driverNavigation';

const DriverView = ({ dispatch }) => {
    return (
        <div>
            <DriverNavigation dispatch={dispatch} />
            <p>Driver site</p>
        </div>
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
