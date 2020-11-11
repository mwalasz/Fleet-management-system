import React from "react";
import { connect } from "react-redux";
import AdminNavigation from "./navigation/adminNavigation";

const AdminView = ({ dispatch }) => {
  return (
    <div>
      <AdminNavigation dispatch={dispatch} />
      <p>Admin site</p>
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

export default connect(mapStateToProps)(AdminView);
