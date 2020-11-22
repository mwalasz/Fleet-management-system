import React from 'react';
import { connect } from 'react-redux';
import AdminNavigation from './navigation/adminNavigation';
import Dashboard from '../../components/Dashboard';
import Content from '../../components/Content';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AdminRoutes } from '../../utils/routes';
import Companies from './content/Companies';
import Users from './content/Users';

const AdminView = ({ dispatch }) => {
    return (
        <Dashboard>
            <AdminNavigation dispatch={dispatch} />
            <Content>
                <Switch>
                    <Route path={AdminRoutes.companies} component={Companies} />
                    <Route path={AdminRoutes.users} component={Users} />

                    <Route render={() => <Redirect to={AdminRoutes.users} />} />
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
