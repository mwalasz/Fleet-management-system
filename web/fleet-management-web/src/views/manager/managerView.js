import React from 'react';
import { connect } from 'react-redux';
import ManagerNavigation from './navigation/managerNavigation';
import Dashboard from '../../components/Dashboard';
import Content from '../../components/Content';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ManagerRoutes } from '../../utils/routes';
import Vehicles from './content/vehicles/Vehicles';
import Informations from './content/Informations';
import Drivers from './content/drivers/Drivers';

const ManagerView = ({ dispatch }) => {
    return (
        <Dashboard>
            <ManagerNavigation dispatch={dispatch} />
            <Content>
                <Switch>
                    <Route path={ManagerRoutes.vehicles} component={Vehicles} />
                    <Route
                        path={ManagerRoutes.informations}
                        component={Informations}
                    />
                    <Route path={ManagerRoutes.drivers} component={Drivers} />

                    <Route
                        render={() => <Redirect to={ManagerRoutes.vehicles} />}
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

export default connect(mapStateToProps)(ManagerView);
