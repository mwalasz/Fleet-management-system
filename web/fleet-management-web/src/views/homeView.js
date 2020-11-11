import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import ProtectedRoute from "../components/protectedRoute";
import "../App.css";
import LoginView from "./loginView";
import Panel from "./panel";

const HomeView = ({ isAuthenticated, isVerifying }) => {
  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute
          path="/panel"
          component={Panel}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        <Route path="/login" component={LoginView} />

        <Route render={() => <Redirect to="/login" />} />
      </Switch>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.isAuthenticated,
    isVerifying: state.isVerifying,
  };
};
export default connect(mapStateToProps)(HomeView);
