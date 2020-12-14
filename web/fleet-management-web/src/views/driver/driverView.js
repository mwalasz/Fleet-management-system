import React from 'react';
import { connect } from 'react-redux';
import Content from '../../components/Content';
import Dashboard from '../../components/Dashboard';
import DriverNavigation from './navigation/driverNavigation';
import Vehicles from './content/vehicles/Vehicles';
import Statistics from './content/statistics/Statistics';
import Trips from './content/trips/Trips';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DRIVER_ROUTES } from '../../utils/routes';

const DriverView = ({ dispatch }) => {
    return (
        <Dashboard>
            <DriverNavigation dispatch={dispatch} />
            <Content>
                <Switch>
                    <Route path={DRIVER_ROUTES.vehicles} component={Vehicles} />
                    <Route
                        path={DRIVER_ROUTES.statistics}
                        component={Statistics}
                    />
                    <Route path={DRIVER_ROUTES.trips} component={Trips} />

                    <Route
                        render={() => <Redirect to={DRIVER_ROUTES.vehicles} />}
                    />
                </Switch>
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
