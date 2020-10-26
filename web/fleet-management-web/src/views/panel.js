import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Manager from "./manager/manager"

function Panel({ user }) {
    let comp = Manager;

    return (
        <>
            <Route path="/panel" component={comp} />
        </>
    );
}

Panel.propTypes = {};

function mapStateToProps(state) {
    return {
        user: state.auth.user,
    };
}
export default connect(mapStateToProps)(Panel);
