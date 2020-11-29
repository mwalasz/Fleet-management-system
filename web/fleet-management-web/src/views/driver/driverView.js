import React from 'react';
import { connect } from 'react-redux';
import Content from '../../components/Content';
import Dashboard from '../../components/Dashboard';
import DriverNavigation from './navigation/driverNavigation';
import Vehicles from './content/Vehicles';
import Statistics from './content/Statistics';
import Trips from './content/trips/Trips';
import { Redirect, Route, Switch } from 'react-router-dom';
import { DriverRoutes } from '../../utils/routes';

const DriverView = ({ dispatch }) => {
    return (
        <Dashboard>
            <DriverNavigation dispatch={dispatch} />
            <Content>
                <Switch>
                    <Route path={DriverRoutes.vehicles} component={Vehicles} />
                    <Route
                        path={DriverRoutes.statistics}
                        component={Statistics}
                    />
                    <Route path={DriverRoutes.trips} component={Trips} />

                    <Route
                        render={() => <Redirect to={DriverRoutes.vehicles} />}
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
