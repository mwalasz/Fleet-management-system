import React from "react";import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "../components/protectedRoute";
import '../App.css';
import Login from "./login"
import Panel from "./panel"

function Home (props) {
    const { isAuthenticated, isVerifying } = props;
    console.log(props);

    return(
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    path="/panel"
                    component={Panel}
                    isAuthenticated={isAuthenticated}
                    isVerifying={isVerifying}
                />
                <Route path="/login" component={Login} />

                <Route render={() => <Redirect to="/login" />} />
            </Switch>
        </BrowserRouter>
    )
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.isAuthenticated,
        isVerifying: state.isVerifying
    };
}
export default connect(mapStateToProps)(Home);