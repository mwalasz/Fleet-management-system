import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import ManagerView from "./manager/managerView";
import DriverView from "./driver/driverView";
import AdminView from "./admin/adminView";

const Panel = ({ user }) => {
  var component = null;

  switch (user.role) {
    case "admin":
      component = AdminView;
      break;
    case "manager":
      component = ManagerView;
      break;
    case "driver":
      component = DriverView;
      break;

    default:
      console.log(user);
      break;
  }

  return (
    <>
      <Route path="/panel" component={component} />
    </>
  );
};

Panel.propTypes = {};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}
export default connect(mapStateToProps)(Panel);
