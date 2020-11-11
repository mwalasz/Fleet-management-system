import React from "react";
import { connect } from "react-redux";
import Navigation from "./navigation/navigation";

function Manager({ dispatch }) {
    return (
        <div>
            <Navigation dispatch={dispatch}/>
            <p>Manager site</p>
        </div>
    );
}

function mapStateToProps(state) {
    return {
        isLoggingOut: state.isLoggingOut,
        logoutError: state.logoutError,
        user: state.user
    };
}
export default connect(mapStateToProps)(Manager);