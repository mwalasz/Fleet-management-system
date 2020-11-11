import React from "react";
import { connect } from "react-redux";
import ManagerNavigation from "./navigation/managerNavigation";

const ManagerView = ({ dispatch }) => {
  return (
    <div>
      <ManagerNavigation dispatch={dispatch} />
      <p>Manager site</p>
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

export default connect(mapStateToProps)(ManagerView);
