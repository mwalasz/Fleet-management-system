import React from 'react';
import { connect } from 'react-redux';
import ManagerNavigation from './navigation/managerNavigation';
import Dashboard from '../../components/Dashboard';
import Content from '../../components/Content';
import { Redirect, Route, Switch } from 'react-router-dom';
import { MANAGER_ROUTES } from '../../utils/routes';
import Vehicles from './content/vehicles/Vehicles';
import Company from './content/company/Company';
import Drivers from './content/drivers/Drivers';

const ManagerView = ({ dispatch }) => {
    return (
        <Dashboard>
            <ManagerNavigation dispatch={dispatch} />
            <Content>
                <Switch>
                    <Route path={MANAGER_ROUTES.vehicles} component={Vehicles} />
                    <Route path={MANAGER_ROUTES.company} component={Company} />
                    <Route path={MANAGER_ROUTES.drivers} component={Drivers} />

                    <Route
                        render={() => <Redirect to={MANAGER_ROUTES.vehicles} />}
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
