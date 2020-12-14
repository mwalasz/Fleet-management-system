import React from 'react';
import { connect } from 'react-redux';
import AdminNavigation from './navigation/adminNavigation';
import Dashboard from '../../components/Dashboard';
import Content from '../../components/Content';
import { Redirect, Route, Switch } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../utils/routes';
import Companies from './content/Companies';
import Users from './content/Users';

const AdminView = ({ dispatch }) => {
    return (
        <Dashboard>
            <AdminNavigation dispatch={dispatch} />
            <Content>
                <Switch>
                    <Route
                        path={ADMIN_ROUTES.companies}
                        component={Companies}
                    />
                    <Route path={ADMIN_ROUTES.users} component={Users} />

                    <Route
                        render={() => <Redirect to={ADMIN_ROUTES.users} />}
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

export default connect(mapStateToProps)(AdminView);
