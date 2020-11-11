import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Manager from "./manager/manager"
import Driver from "./driver/driver"

function Panel({ user }) {
    let comp = (user.role === "driver") 
            ? Driver
            : Manager;

    return (
        <>
            <Route path="/panel" component={comp} />
        </>
    );
}

Panel.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}
export default connect(mapStateToProps)(Panel);
